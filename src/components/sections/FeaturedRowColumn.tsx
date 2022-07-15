import {Image, Link, Video} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Heading, Text, Button} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function FeaturedRowColumn({
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
    <article className="featured-row-image-with-text">
      <div className="relative flex flex-col gap-1">
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
        <div className="flex-1">
          {heading?.value && (
            <Heading
              format
              as="h3"
              size="copy"
              className="max-w-md mb-[15px] uppercase"
            >
              {heading.value}
            </Heading>
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
    </article>
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
