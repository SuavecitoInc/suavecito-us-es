import React, {useEffect, useCallback, useState} from 'react';
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

import {
  Heading,
  Text,
  Button,
  ProductOptions,
  ProductColorOptions,
} from '~/components';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductOptionsVariantForm({
  theme = 'suavecito',
  showQuantitySelector = true,
  optionNames,
  tags,
  colorOptions = [],
}: {
  theme?: BrandTheme;
  showQuantitySelector?: boolean;
  optionNames: string[];
  tags: string[];
  colorOptions?: Metafield[];
}) {
  const {pathname, search} = useUrl();
  const [params, setParams] = useState(new URLSearchParams(search));

  const [quantity, setQuantity] = useState<string>('1');

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

    mainValue = initialSelectedOptions[optionNames[0]] as string;
    available = filterOptions(optionNames[0], mainValue, mainValue);
    if (optionNames.length > 2) {
      available = filterLastOption(initialSelectedOptions, available);
    }

    setAvailableOptions(available);
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

  const handleQuantity = (e: {target: {value: React.SetStateAction<string>}}) =>
    setQuantity(e.target.value);

  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {colorOptions.length > 0 && (
            <ColorOptions
              name="Color"
              handleChange={handleChange}
              // @ts-ignore
              values={options[0].values}
              colorOptions={colorOptions}
              availableOptions={availableOptions}
            />
          )}

          {colorOptions.length === 0 &&
            (options as OptionWithValues[]).map(({name, values}, index) => {
              if (values.length === 1) {
                return null;
              }

              // @ts-ignore Variant Fragrance Profile does not  exist on selected variant
              if (index === 1 && selectedVariant?.variantFragranceProfile) {
                return (
                  <div className="grid gap-4" key={name}>
                    <div
                      className="fragrance-profile"
                      dangerouslySetInnerHTML={{
                        // @ts-ignore Variant Fragrance Profile does not  exist on selected variant
                        __html: selectedVariant?.variantFragranceProfile.value,
                      }}
                    />

                    <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
                      <Heading
                        as="legend"
                        size="lead"
                        className="min-w-[4rem] font-nexa-rust"
                      >
                        {name}
                      </Heading>
                      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-max items-center justify-center gap-4">
                        <ProductOptions
                          name={name}
                          handleChange={handleChange}
                          values={values}
                          availableOptions={availableOptions}
                          index={index}
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={name}>
                  <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
                    <Heading
                      as="legend"
                      size="lead"
                      className="min-w-[4rem] font-nexa-rust"
                    >
                      {name}
                    </Heading>
                    <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-max items-center justify-center gap-4">
                      <ProductOptions
                        name={name}
                        handleChange={handleChange}
                        values={values}
                        availableOptions={availableOptions}
                        index={index}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      }

      <div className="gird-gap-2">
        {selectedVariant && (
          <div className="text-black font-bold text-3xl">
            <Money
              withoutTrailingZeros
              data={selectedVariant.priceV2!}
              as="span"
            />
            {(isOnSale || tags.includes('On Sale')) && (
              <>
                {selectedVariant.compareAtPriceV2 && (
                  <Money
                    withoutTrailingZeros
                    data={selectedVariant.compareAtPriceV2!}
                    as="span"
                    className="ml-3 opacity-50 strike"
                  />
                )}
              </>
            )}
            {(isOnSale || tags.includes('On Sale')) && (
              <span className="bg-suave-yellow text-black font-semibold mr-2 px-2.5 py-0.5 ml-4">
                Sale
              </span>
            )}
          </div>
        )}
      </div>

      <div
        className={`grid ${
          showQuantitySelector ? 'grid-cols-3' : 'items-stretch'
        } gap-4`}
      >
        {showQuantitySelector && (
          <input
            type="number"
            min="1"
            pattern="[0-9]*"
            onChange={handleQuantity}
            value={quantity}
            className="col-span-1 w-[60%]"
          />
        )}

        <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={Number(quantity)}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          className={`${showQuantitySelector ? 'col-span-2' : ''}`}
        >
          <Button
            width="full"
            variant={isOutOfStock ? 'secondary' : theme}
            as="span"
          >
            {isOutOfStock ? (
              <Text>Sold out</Text>
            ) : (
              <Text
                as="span"
                className="flex items-center justify-center gap-2"
              >
                <span>ADD TO CART</span>
              </Text>
            )}
          </Button>
        </AddToCartButton>
        {/* {!isOutOfStock && <ShopPayButton variantIds={[selectedVariant.id!]} />} */}
      </div>
    </form>
  );
}

function ColorOptions({
  name,
  values,
  handleChange,
  colorOptions,
  availableOptions,
}: {
  name: string;
  values: any[];
  handleChange: (name: string, value: string) => void;
  colorOptions: Metafield[];
  availableOptions: {[key: string]: string[]};
}) {
  const {selectedOptions} = useProductOptions();

  return (
    <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
      <Heading as="legend" size="lead" className="min-w-[4rem] font-nexa-rust">
        {/* @ts-ignore */}
        {name}: {selectedOptions[name]}
      </Heading>
      <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-max items-center justify-center gap-4">
        <ProductColorOptions
          name={name}
          handleChange={handleChange}
          values={values}
          colorOptions={colorOptions}
          availableOptions={availableOptions}
        />
      </div>
    </div>
  );
}
