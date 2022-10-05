import React, {useEffect, useCallback, useState} from 'react';
import {useEffectOnce} from 'react-use';
import {
  useProductOptions,
  isBrowser,
  useUrl,
  Money,
  OptionWithValues,
  ShopPayButton,
} from '@shopify/hydrogen';
import {
  useVariantsWithOptions,
  useAvailableOptions,
  useFilterExcludedVariants,
} from '~/hooks';
import {
  Heading,
  Text,
  ProductOptions,
  ProductColorOptions,
  Badge,
  AddToCartButton,
} from '~/components';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

interface Metafield {
  value: string;
  reference?: object;
}

const product_form: {[key: string]: any} = {
  addToCart: {
    en: 'Add to Cart',
    es: 'Agregar al Carrito',
  },
  soldOut: {
    en: 'Sold Out',
    es: 'Agotado',
  },
  options: {
    color: {
      en: 'Color',
      es: 'Color',
    },
    fragrance: {
      en: 'Fragrance',
      es: 'Fragancia',
    },
    edition: {
      en: 'Edition',
      es: 'Edición',
    },
    size: {
      en: 'Size',
      es: 'Tamaño',
    },
    style: {
      en: 'Style',
      es: 'Estillo',
    },
  },
};

export function ProductOptionsVariantForm({
  lang = 'en',
  theme = 'suavecito',
  showQuantitySelector = true,
  optionNames,
  tags,
  colorOptions = [],
}: {
  lang?: 'en' | 'es';
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

  // delete
  const {excludedVariantIds} = useFilterExcludedVariants(
    variants as ProductVariant[],
    options as {name: string; values: string[]}[],
  );

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

  // reset quantity on variant change
  // useEffect(() => {
  //   if (showQuantitySelector) setQuantity('1');
  // }, [selectedVariant, showQuantitySelector]);

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
      let matchedVariant: any = false;
      // if excluded id do not find variant, set to first variant
      if (!excludedVariantIds.includes(variantGID))
        matchedVariant = variants?.find(
          (variant) => variant?.id === variantGID,
        );
      // set variant url param to first variant if variant id not found
      if (!matchedVariant) {
        // @ts-ignore
        matchedVariant = variants[0];
        let id = matchedVariant.id;
        if (id) id = id.replace('gid://shopify/ProductVariant/', '');
        params.set(encodeURIComponent('variant'), encodeURIComponent(id)),
          window.history.replaceState(
            null,
            '',
            `${pathname}?${params.toString()}`,
          );
      }
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
        // setSelectedOption(name, variantOption?.value);
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

  const secondary: 'secondary' | 'premium blends secondary' =
    theme === 'premium blends' ? `${theme} secondary` : 'secondary';

  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {colorOptions.length > 0 && (
            <ColorOptions
              languageCode={lang}
              // @ts-ignore
              name={options[0].name}
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

              const localeName =
                product_form.options[name.toLowerCase()] !== undefined
                  ? product_form.options[name.toLowerCase()][lang]
                  : name;

              // @ts-ignore Variant Fragrance Profile does not  exist on selected variant
              if (index === 0 && selectedVariant?.variantFragranceProfile) {
                return (
                  <div className="grid gap-4" key={name}>
                    <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
                      <Heading
                        as="legend"
                        size="lead"
                        className={`min-w-[4rem] font-nexa-rust ${
                          theme === 'premium blends'
                            ? 'text-white'
                            : 'text-black'
                        }`}
                      >
                        {localeName}
                      </Heading>
                      <div className="grid items-center justify-center grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
                        <ProductOptions
                          theme={theme}
                          name={name}
                          handleChange={handleChange}
                          values={values}
                          availableOptions={availableOptions}
                          index={index}
                        />
                      </div>
                    </div>

                    <div
                      className={`fragrance-pofile ${
                        theme === 'premium blends' && 'text-white'
                      }`}
                      dangerouslySetInnerHTML={{
                        // @ts-ignore Variant Fragrance Profile does not  exist on selected variant
                        __html: selectedVariant?.variantFragranceProfile.value,
                      }}
                    />
                  </div>
                );
              }

              return (
                <div key={name}>
                  <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
                    <Heading
                      as="legend"
                      size="lead"
                      className={`min-w-[4rem] font-nexa-rust ${
                        theme === 'premium blends' ? 'text-white' : 'text-black'
                      }`}
                    >
                      {localeName}
                    </Heading>
                    <div className="grid items-center justify-center grid-cols-4 gap-4 md:grid-cols-3 lg:grid-cols-4 auto-rows-max">
                      <ProductOptions
                        theme={theme}
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
          <div
            className={`${
              theme === 'premium blends' ? 'text-white' : 'text-black'
            } font-bold text-3xl`}
          >
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
            {isOnSale && tags.includes('On Sale') && <Badge tags={tags} />}
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
            max={
              selectedVariant?.quantityAvailable
                ? selectedVariant?.quantityAvailable
                : '10'
            }
            pattern="[0-9]*"
            onChange={handleQuantity}
            value={quantity}
            disabled={isOutOfStock}
            className="col-span-1 w-[60%]"
          />
        )}

        <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={Number(quantity)}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          className={`${showQuantitySelector ? 'col-span-2' : ''}`}
          width="full"
          variant={isOutOfStock ? secondary : theme}
          as="span"
        >
          {isOutOfStock ? (
            <Text>{product_form.soldOut[lang]}</Text>
          ) : (
            <Text as="span" className="flex items-center justify-center gap-2">
              <span className="uppercase">{product_form.addToCart[lang]}</span>
            </Text>
          )}
        </AddToCartButton>

        {/* {!isOutOfStock && <ShopPayButton variantIds={[selectedVariant.id!]} />} */}
      </div>
    </form>
  );
}

function ColorOptions({
  languageCode,
  name,
  values,
  handleChange,
  colorOptions,
  availableOptions,
}: {
  languageCode: 'en' | 'es';
  name: string;
  values: any[];
  handleChange: (name: string, value: string) => void;
  colorOptions: Metafield[];
  availableOptions: {[key: string]: string[]};
}) {
  const {selectedOptions} = useProductOptions();

  const localeName =
    product_form.options[name.toLowerCase()] !== undefined
      ? product_form.options[name.toLowerCase()][languageCode]
      : name;

  return (
    <div className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0">
      <Heading as="legend" size="lead" className="min-w-[4rem] font-nexa-rust">
        {/* @ts-ignore */}
        {localeName}: {selectedOptions[name]}
      </Heading>
      <div className="grid items-center justify-center grid-cols-4 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-rows-max">
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
