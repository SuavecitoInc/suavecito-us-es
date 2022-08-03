import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

export const brandThemeTextColors: {[key: string]: string} = {
  suavecito: 'text-suave-red',
  suavecita: 'text-suave-pink',
  'premium blends': 'text-suave-red',
  'firme club': 'text-suave-red',
  'cerveza cito': 'text-suave-red',
  'tres noir': 'text-suave-red',
};

export const brandThemeBgColors: {[key: string]: string} = {
  suavecito: 'bg-suave-red hover:bg-suave-red-focus text-white',
  suavecita: 'bg-suave-pink hover:bg-suave-pink-focus text-white',
  'premium blends': 'bg-suave-red hover:bg-suave-red-focus text-white',
  'firme club': 'bg-suave-red hover:bg-suave-red-focus text-white',
  'cerveza cito': 'bg-suave-red hover:bg-suave-red-focus text-white',
  'tres noir': 'bg-suave-red hover:bg-suave-red-focus text-white',
};

export const getColorOptions = (variants: {nodes: ProductVariant[]}) => {
  const colorOptions: any[] = [];
  // @ts-ignore
  if (!variants.nodes[0].variantColorImage) return colorOptions;
  variants.nodes?.map((variant: ProductVariant) => {
    // @ts-ignore
    colorOptions.push(variant?.variantColorImage);
  });
  return colorOptions;
};
