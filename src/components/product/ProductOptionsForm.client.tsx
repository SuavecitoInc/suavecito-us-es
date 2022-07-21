import {useEffect, useCallback, useState} from 'react';
import {useEffectOnce} from 'react-use';
import {
  useProductOptions,
  isBrowser,
  useUrl,
  AddToCartButton,
  Money,
  OptionWithValues,
  ShopPayButton,
} from '@shopify/hydrogen';

import {Heading, Text, Button, ProductOptions} from '~/components';

export function ProductOptionsForm({
  optionNames,
  initialAvailable,
}: {
  optionNames: string[];
  initialAvailable: {[key: string]: any[]};
}) {
  const {pathname, search} = useUrl();
  const [params, setParams] = useState(new URLSearchParams(search));

  const {
    options,
    setSelectedOption,
    selectedOptions,
    selectedVariant,
    variants,
  } = useProductOptions();

  // new state
  const [availableOptions, setAvailableOptions] = useState<{
    [key: string]: any;
  }>(initialAvailable);

  const isOutOfStock = !selectedVariant?.availableForSale || false;
  // const isOnSale =
  //   selectedVariant?.priceV2?.amount <
  //     selectedVariant?.compareAtPriceV2?.amount || false;
  const isOnSale =
    selectedVariant?.priceV2?.amount &&
    selectedVariant?.compareAtPriceV2?.amount
      ? selectedVariant?.priceV2?.amount <
          selectedVariant?.compareAtPriceV2?.amount || false
      : false;

  useEffect(() => {
    if (params || !search) return;
    setParams(new URLSearchParams(search));
  }, [params, search]);

  useEffectOnce(() => {
    let mainValue: string;
    const initialSelectedOptions: {[key: string]: string | undefined} = {
      ...selectedOptions,
    };
    let available: {[key: string]: any[]} = {};
    (options as OptionWithValues[]).map(({name, values}) => {
      if (!params) return;
      const currentValue = params.get(name.toLowerCase()) || null;
      if (currentValue) {
        const matchedValue = values.filter(
          (value) => encodeURIComponent(value.toLowerCase()) === currentValue,
        );
        if (name === optionNames[0]) {
          mainValue = matchedValue[0];
        }
        setSelectedOption(name, matchedValue[0]);
        initialSelectedOptions[name] = matchedValue[0];
        if (mainValue !== '') {
          available = filterOptions(name, matchedValue[0], mainValue);
        }
      } else {
        params.set(
          encodeURIComponent(name.toLowerCase()),
          encodeURIComponent(selectedOptions![name]!.toLowerCase()),
        ),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
    });
    if (optionNames.length > 2) {
      available = filterLastOption(initialSelectedOptions, available);
    }

    setAvailableOptions(available);
    // don't seem to need this in dev only in build, why?
    const value = initialSelectedOptions[optionNames[0]] as string;
    handleChange(optionNames[0], value);
  });

  // filter
  const filterOptions = useCallback(
    (name: string, value: string, masterValue: string) => {
      const defaultAvailableOptions: {[key: string]: any} = {};
      options?.forEach((option) => {
        if (option?.name) defaultAvailableOptions[option.name] = [];
      });
      const available: any = {...defaultAvailableOptions};
      available[name] = [];

      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const values = variant?.selectedOptions.filter(
          (option) => option?.value === value,
        );

        if (values.length > 0) {
          values.forEach((option) => {
            if (!available[name].includes(option?.value)) {
              available[name].push(option?.value);
            }
          });
        }
      });

      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const values = variant?.selectedOptions.filter(
          (option) => option?.value === masterValue,
        );

        if (values.length > 0) {
          variant?.selectedOptions.forEach((option) => {
            if (
              option?.name &&
              !available[option?.name].includes(option?.value)
            ) {
              available[option?.name].push(option?.value);
            }
          });
        }
      });
      // set option 1
      if (options) {
        const option1 = options[0];
        available[optionNames[0]] = option1?.values;
      }
      return available;
    },
    [variants, options, optionNames],
  );

  const filterLastOption = useCallback(
    (currentSelectedOptions: any, available: any) => {
      const firstOption = optionNames[0];
      const secondOption = optionNames[1];
      const thirdOption = optionNames[2];
      available[thirdOption] = [];

      const thirdValues: any[] = [];
      variants?.forEach((variant) => {
        if (!variant?.selectedOptions) return;
        const firstValues = variant?.selectedOptions.filter(
          (option) => option?.value === currentSelectedOptions[firstOption],
        );
        const secondValues = variant?.selectedOptions.filter(
          (option) => option?.value === currentSelectedOptions[secondOption],
        );
        if (firstValues.length > 0 && secondValues.length > 0) {
          const thirdValue = variant?.selectedOptions.find(
            (option) => option?.name === thirdOption,
          );
          if (!thirdValues.includes(thirdValue)) {
            thirdValues.push(thirdValue?.value);
          }
        }
      });

      available[thirdOption] = thirdValues;
      return available;
    },
    [variants, optionNames],
  );

  const handleChange = useCallback(
    (name: string, value: string) => {
      const newSelectedOptions: any = {...selectedOptions};
      newSelectedOptions[name] = value;

      // filter
      let available = filterOptions(
        name,
        value,
        newSelectedOptions[optionNames[0]],
      );

      // update new selected options based on filtered
      optionNames.forEach((optionName) => {
        if (optionName !== optionNames[0]) {
          const optionValue = available[optionName][0];
          newSelectedOptions[optionName] = optionValue;
        }
      });

      // update last option based on first two
      if (optionNames.length > 2) {
        available = filterLastOption(newSelectedOptions, available);
      }
      setAvailableOptions(available);
      // update params
      if (!params) return;
      optionNames.forEach((optionName) => {
        const optionValue = newSelectedOptions[optionName];
        setSelectedOption(optionName, optionValue);
        params.set(
          encodeURIComponent(optionName.toLowerCase()),
          encodeURIComponent(optionValue.toLowerCase()),
        );
        if (isBrowser()) {
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
        }
      });
    },
    [
      selectedOptions,
      setSelectedOption,
      params,
      pathname,
      optionNames,
      filterOptions,
      filterLastOption,
    ],
  );

  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {(options as OptionWithValues[]).map(({name, values}, index) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <Heading as="legend" size="lead" className="min-w-[4rem]">
                  {name}
                </Heading>
                <div className="flex flex-wrap items-baseline gap-4">
                  <ProductOptions
                    name={name}
                    handleChange={handleChange}
                    values={values}
                    availableOptions={availableOptions}
                    index={index}
                  />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div className="grid items-stretch gap-4">
        <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
        >
          <Button
            width="full"
            variant={isOutOfStock ? 'secondary' : 'primary'}
            as="span"
          >
            {isOutOfStock ? (
              <Text>Sold out</Text>
            ) : (
              <Text
                as="span"
                className="flex items-center justify-center gap-2"
              >
                <span>Add to bag</span> <span>·</span>{' '}
                <Money
                  withoutTrailingZeros
                  data={selectedVariant.priceV2!}
                  as="span"
                />
                {isOnSale && (
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant.compareAtPriceV2!}
                    as="span"
                    className="opacity-50 strike"
                  />
                )}
              </Text>
            )}
          </Button>
        </AddToCartButton>
        {!isOutOfStock && <ShopPayButton variantIds={[selectedVariant.id!]} />}
      </div>
    </form>
  );
}
