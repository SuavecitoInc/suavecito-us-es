import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {useCallback, useState} from 'react';

export function useAvailableOptions(
  options: {name: string; values: string[]}[],
  variants: ProductVariant[],
  optionNames: string[],
) {
  const defaultAvailable = optionNames.reduce(
    (accumulator: {[key: string]: string[]}, value: string) => {
      const arr: string[] = [];
      return {...accumulator, [value]: arr};
    },
    {},
  );
  // set initial
  const [availableOptions, setAvailableOptions] = useState<{
    [key: string]: string[];
  }>(() => defaultAvailable);

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

  // last option filter
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

  return {
    availableOptions,
    setAvailableOptions,
    filterOptions,
    filterLastOption,
  };
}
