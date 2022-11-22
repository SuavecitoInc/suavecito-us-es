import {useMemo} from 'react';
import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

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
    // @ts-ignore
    variants?.forEach((variant: ProductVariant) => {
      // @ts-ignore
      if (variant.variantExcluded && variant.variantExcluded.value === 'true') {
        excludedVariantIds.push(variant.id);
        if (variant.selectedOptions[0])
          excludedOptions.push(variant.selectedOptions[0].value);
        if (variant.selectedOptions[1])
          excludedOptions.push(variant.selectedOptions[1].value);
        if (variant.selectedOptions[2])
          excludedOptions.push(variant.selectedOptions[2].value);
      }
    });
    // get option count
    const excludedOpts: any = {};
    variants?.forEach((variant: ProductVariant) => {
      if (variant.selectedOptions[0]) {
        if (!excludedOpts[variant.selectedOptions[0].value]) {
          excludedOpts[variant.selectedOptions[0].value] = 1;
        } else {
          excludedOpts[variant.selectedOptions[0].value] += 1;
        }
      }
      if (variant.selectedOptions[1]) {
        if (!excludedOpts[variant.selectedOptions[1].value]) {
          excludedOpts[variant.selectedOptions[1].value] = 1;
        } else {
          excludedOpts[variant.selectedOptions[1].value] += 1;
        }
      }
      if (variant.selectedOptions[2]) {
        if (!excludedOpts[variant.selectedOptions[2].value]) {
          excludedOpts[variant.selectedOptions[2].value] = 1;
        } else {
          excludedOpts[variant.selectedOptions[2].value] += 1;
        }
      }
    });
    // do not remove options that have multiple variants attached
    const updatedOptions: string[] = [];
    excludedOptions.forEach((opt) => {
      if (excludedOpts[opt] <= 1) {
        updatedOptions.push(opt);
      }
    });

    // remove options from options
    // @ts-ignore
    options?.forEach((option: {name: string; values: string[]}) => {
      const filteredValues = option.values.filter(
        (value: string) => !updatedOptions.includes(value),
      );
      option.values = filteredValues;
    });

    return excludedVariantIds;
  }, [variants, options]);

  return {excludedVariantIds};
}
