import {Image, Link} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Section} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function ThreeImageBanner({
  image1,
  link1,
  image2,
  link2,
  image3,
  link3,
  loading = 'eager',
}: {
  image1: Metafield;
  link1?: string;
  image2: Metafield;
  link2?: string;
  image3: Metafield;
  link3?: string;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <section>
      <div className="grid grid-cols-1 gap-0 page-width md:grid-cols-3">
        <FeaturedMedia
          scale={2}
          sizes={
            image1?.reference
              ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
              : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
          }
          widths={image1?.reference ? [500, 450, 700] : [500, 900, 1400]}
          width={image1?.reference ? 375 : 750}
          data={image1.reference as Media}
          loading={loading}
        />
        <FeaturedMedia
          scale={2}
          sizes={
            image2?.reference
              ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
              : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
          }
          widths={image2?.reference ? [500, 450, 700] : [500, 900, 1400]}
          width={image2?.reference ? 375 : 750}
          data={image2.reference as Media}
          loading={loading}
        />
        <FeaturedMedia
          scale={2}
          sizes={
            image3?.reference
              ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
              : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
          }
          widths={image3?.reference ? [500, 450, 700] : [500, 900, 1400]}
          width={image3?.reference ? 375 : 750}
          data={image3.reference as Media}
          loading={loading}
        />
      </div>
    </section>
  );
}

interface FeaturedMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

function FeaturedMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: FeaturedMediaProps) {
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
