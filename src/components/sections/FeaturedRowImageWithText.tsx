import {Image, Link, Video} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Heading, Text, Button} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function FeaturedRowImageWithText({
  heading,
  subText,
  cta,
  ctaLink,
  featuredImage,
  loading,
}: {
  heading: Metafield;
  subText: Metafield;
  cta: Metafield;
  ctaLink: string;
  featuredImage: Metafield;
  loading?: 'eager' | 'lazy';
}) {
  return (
    <section className="featured-row-image-with-text pt-[55px] pb-[55px]">
      <div className="page-width relative flex flex-col md:flex-row gap-4 md:gap-0 justify-center items-center">
        <div className="flex-1">
          <div className="image-wrapper aspect-[1] overflow-clip inset-0">
            <FeaturedMedia
              scale={2}
              sizes={
                featuredImage?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                featuredImage?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={featuredImage?.reference ? 375 : 750}
              data={featuredImage.reference as Media}
              loading={loading}
            />
          </div>
        </div>
        <div className="flex-1 md:pl-[35px]">
          {heading?.value && (
            <h3 className="max-w-md mb-[15px] uppercase font-bold text-2xl lg:text-3xl">
              {heading.value}
            </h3>
          )}
          {subText?.value && (
            <Text format width="wide" as="p" size="copy" className="mb-[20px]">
              {subText.value}
            </Text>
          )}
          {cta?.value && (
            <Button size="lead" to={ctaLink} className="uppercase">
              {cta.value}
            </Button>
          )}
        </div>
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
