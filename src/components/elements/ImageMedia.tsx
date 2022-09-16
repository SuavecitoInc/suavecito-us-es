import {Image} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

interface ImageMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

export function ImageMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: ImageMediaProps) {
  return (
    <Image
      widths={widths}
      sizes={sizes}
      alt={data.alt || 'Marketing Banner Image'}
      className="block object-cover w-full h-full"
      // @ts-ignore
      data={data.image}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
