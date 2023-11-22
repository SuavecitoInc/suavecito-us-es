import {useMemo} from 'react';
import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

interface ProductVariantWithExcluded extends ProductVariant {
  variantExcluded?: null | {
    value: string;
  };
}

export function useFilterExcludedVariants(
  variants: ProductVariant[],
  options: {
    name: string;
    values: string[];
  }[],
) {
  const excludedVariantIds = useMemo(() => {
    // deep clone
    // const filteredVariants = JSON.parse(JSON.stringify(variants));
    // const filteredOptions = JSON.parse(JSON.stringify(options));
    // get excluded variant options
    const excludedOptions: string[] = [];
    const excludedVariantIds: string[] = [];
    // excluded options
    const variantOptions1: string[] = [];
    const variantOptions2: string[] = [];
    const variantOptions3: string[] = [];

    // @ts-ignore
    variants?.forEach((variant: ProductVariantWithExcluded) => {
      // @ts-ignore
      if (variant.variantExcluded && variant.variantExcluded.value === 'true') {
        excludedVariantIds.push(variant.id);
        if (
          variant.selectedOptions[0] &&
          !variantOptions1.includes(variant.selectedOptions[0].value)
        )
          variantOptions1.push(variant.selectedOptions[0].value);
        if (
          variant.selectedOptions[1] &&
          !variantOptions2.includes(variant.selectedOptions[1].value)
        )
          variantOptions2.push(variant.selectedOptions[1].value);
        if (
          variant.selectedOptions[2] &&
          !variantOptions2.includes(variant.selectedOptions[2].value)
        )
          variantOptions3.push(variant.selectedOptions[2].value);
      }
    });

    // option 1
    variantOptions1.forEach((opt) => {
      let count = 0;
      let excluded = 0;
      variants?.forEach((variant: ProductVariantWithExcluded) => {
        if (variant.selectedOptions[0]) {
          if (variant.selectedOptions[0].value === opt) {
            count += 1;
            if (
              variant.variantExcluded &&
              variant.variantExcluded.value === 'true'
            ) {
              excluded += 1;
            }
          }
        }
      });
      if (count === excluded && !excludedOptions.includes(opt)) {
        excludedOptions.push(opt);
      }
    });

    // option 2
    variantOptions2.forEach((opt) => {
      let count = 0;
      let excluded = 0;
      variants?.forEach((variant: ProductVariantWithExcluded) => {
        if (variant.selectedOptions[1]) {
          if (variant.selectedOptions[1].value === opt) {
            count += 1;
            if (
              variant.variantExcluded &&
              variant.variantExcluded.value === 'true'
            ) {
              excluded += 1;
            }
          }
        }
      });
      if (count === excluded && !excludedOptions.includes(opt)) {
        excludedOptions.push(opt);
      }
    });

    // option 3
    variantOptions3.forEach((opt) => {
      let count = 0;
      let excluded = 0;
      variants?.forEach((variant: ProductVariantWithExcluded) => {
        if (variant.selectedOptions[2]) {
          if (variant.selectedOptions[2].value === opt) {
            count += 1;
            if (
              variant.variantExcluded &&
              variant.variantExcluded.value === 'true'
            ) {
              excluded += 1;
            }
          }
        }
      });

      if (count === excluded && !excludedOptions.includes(opt)) {
        excludedOptions.push(opt);
      }
    });

    // remove options from options
    // @ts-ignore
    options?.forEach((option: {name: string; values: string[]}) => {
      const filteredValues = option.values.filter(
        (value: string) => !excludedOptions.includes(value),
      );
      // this removes the options from the options
      option.values = filteredValues;
    });

    return excludedVariantIds;
  }, [variants, options]);

  return {excludedVariantIds};
}
