import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {useMemo} from 'react';

// returns an array of variants that is easier to filter through
// selectedOptions is { option1: option1Value, option2: option2Value, option3: option3Value }

export function useVariantsWithOptions(variants: ProductVariant[]) {
  const variantsWithOptions = useMemo(() => {
    const arr: {id: string; selectedOptions: {[key: string]: string}}[] = [];
    variants?.forEach((variant) => {
      if (variant?.selectedOptions) {
        const v: {id: string; selectedOptions: {[key: string]: string}} = {
          id: '',
          selectedOptions: {},
        };
        v.id = variant?.id as string;
        variant?.selectedOptions.forEach((option) => {
          const name = option?.name as string;
          const value = option?.value as string;
          v.selectedOptions[name] = value;
        });
        arr.push(v);
      }
    });
    return arr;
  }, [variants]);

  const findVariantWithOptions = (options: {[key: string]: string}) => {
    const foundVariant = variantsWithOptions.find(
      (variant) =>
        JSON.stringify(variant.selectedOptions) === JSON.stringify(options),
    );
    return foundVariant;
  };

  return {
    variantsWithOptions,
    findVariantWithOptions,
  };
}
