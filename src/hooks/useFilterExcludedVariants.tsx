import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

export function useFilterExcludedVariants(
  variants: ProductVariant[],
  options: {
    name: string;
    values: string[];
  }[],
) {
  // deep clone
  const filteredVariants = JSON.parse(JSON.stringify(variants));
  const filteredOptions = JSON.parse(JSON.stringify(options));
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
    }
  });
  // remove variants
  // filteredVariants?.filter(
  //   (variant: ProductVariant) => !excludedVariantIds.includes(variant.id),
  // );
  // remove options from options
  // @ts-ignore
  options?.forEach((option: {name: string; values: string[]}) => {
    const filteredValues = option.values.filter(
      (value: string) => !excludedOptions.includes(value),
    );
    option.values = filteredValues;
  });

  return {excludedVariantIds};
}
