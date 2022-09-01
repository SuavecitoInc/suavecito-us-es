import {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

export function useGetInitialVariant(
  initialVariant: string | null,
  variants: ProductVariant[],
) {
  const excludedVariantIds: string[] = [];
  variants?.forEach((variant: ProductVariant) => {
    // @ts-ignore
    if (variant.variantExcluded && variant.variantExcluded.value === 'true') {
      excludedVariantIds.push(variant.id);
    }
  });

  let id: undefined | string = undefined;
  if (initialVariant) {
    const gid = `gid://shopify/ProductVariant/${initialVariant}`;
    if (excludedVariantIds.includes(gid)) {
      id = variants[0].id;
    } else {
      id = gid;
    }
  }
  return {id};
}
