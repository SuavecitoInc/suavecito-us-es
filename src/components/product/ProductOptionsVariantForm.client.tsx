import {useEffect, useCallback, useState, useMemo} from 'react';
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
import {useVariantsWithOptions, useAvailableOptions} from '~/hooks';

import {Heading, Text, Button, ProductOptions} from '~/components';
import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

export function ProductOptionsVariantForm({
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

  const {findVariantWithOptions} = useVariantsWithOptions(
    variants as ProductVariant[],
  );

  const {
    availableOptions,
    setAvailableOptions,
    filterOptions,
    filterLastOption,
  } = useAvailableOptions(
    options as {name: string; values: string[]}[],
    variants as ProductVariant[],
    optionNames,
  );

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

    // get variant
    const currentVariant = params.get('variant') || null;
    if (currentVariant) {
      const variantGID = `gid://shopify/ProductVariant/${currentVariant}`;
      const matchedVariant: any = variants?.find(
        (variant) => variant?.id === variantGID,
      );
      // get selected options
      optionNames.forEach((name) => {
        const variantOption = matchedVariant?.selectedOptions.find(
          (option: {name: string; value: string}) => option?.name === name,
        );
        // set main value
        if (name === optionNames[0]) {
          mainValue = variantOption?.value;
        }
        // set new selected options
        setSelectedOption(name, variantOption?.value);
        initialSelectedOptions[name] = variantOption?.value;
        if (mainValue !== '') {
          available = filterOptions(name, variantOption?.value, mainValue);
        }
      });
    } else {
      let id = selectedVariant?.id as string;
      if (id) id = id.replace('gid://shopify/ProductVariant/', '');
      params.set(encodeURIComponent('variant'), encodeURIComponent(id)),
        window.history.replaceState(
          null,
          '',
          `${pathname}?${params.toString()}`,
        );
    }
    if (optionNames.length > 2) {
      available = filterLastOption(initialSelectedOptions, available);
    }

    setAvailableOptions(available);
    // don't seem to need this in dev only in build, why?
    // mainValue = initialSelectedOptions[optionNames[0]] as string;
    // available = filterOptions(optionNames[0], mainValue, mainValue);
    // setAvailableOptions(available);

    // const value = initialSelectedOptions[optionNames[0]] as string;
    // handleChange(optionNames[0], value);
  });

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
      });
      // get variant id
      const foundVariant = findVariantWithOptions(newSelectedOptions);
      if (foundVariant) {
        const id = foundVariant.id.replace('gid://shopify/ProductVariant/', '');
        params.set(encodeURIComponent('variant'), encodeURIComponent(id));
        if (isBrowser()) {
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
        }
      }
    },
    [
      selectedOptions,
      setSelectedOption,
      params,
      pathname,
      optionNames,
      filterOptions,
      filterLastOption,
      findVariantWithOptions,
      setAvailableOptions,
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
