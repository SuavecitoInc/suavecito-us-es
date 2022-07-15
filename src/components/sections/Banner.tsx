import {Image, Link} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Heading, Text, Button} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function Banner({
  byline,
  cta,
  ctaLink,
  handle,
  heading,
  height,
  loading,
  spread,
  top,
  displayHeading,
}: {
  byline: Metafield;
  cta: Metafield;
  ctaLink: string;
  handle: string;
  heading: Metafield;
  height?: 'full';
  loading?: 'eager' | 'lazy';
  spread: Metafield;
  top?: boolean;
  displayHeading?: boolean;
}) {
  return (
    <section className={`relative justify-end flex flex-col w-full`}>
      <div className="relative inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
        {spread?.reference && (
          <div className="">
            <SpreadMedia
              scale={2}
              sizes={
                spread?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={spread?.reference ? [500, 450, 700] : [500, 900, 1400]}
              width={spread?.reference ? 375 : 750}
              data={spread.reference as Media}
              loading={loading}
            />
          </div>
        )}
        {displayHeading && (
          <div className="absolute flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast w-full h-full">
            <div className="">
              {heading?.value && (
                <Heading format as="h2" size="display" className="max-w-md">
                  {heading.value}
                </Heading>
              )}
              {byline?.value && (
                <Text format width="narrow" as="p" size="lead">
                  {byline.value}
                </Text>
              )}
              {cta?.value && (
                <Button size="lead" to={ctaLink} className="uppercase">
                  {cta.value}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

interface SpreadMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

function SpreadMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: SpreadMediaProps) {
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
