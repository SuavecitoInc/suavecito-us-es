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
  heading,
  loading,
  spread,
  displayContent,
  contentAlignment = 'bottom-right',
  textColor = 'black',
  buttonColor = 'suavecito',
  overlayOpacityStart = 50,
  overlayOpacityEnd = 70,
}: {
  byline: Metafield;
  cta: Metafield;
  ctaLink: string;
  heading: Metafield;
  loading?: 'eager' | 'lazy';
  spread: Metafield;
  displayContent?: boolean;
  contentAlignment?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  textColor?: 'black' | 'white';
  buttonColor?:
    | 'primary'
    | 'secondary'
    | 'inline'
    | 'suavecito'
    | 'suavecita'
    | 'yellow'
    | 'grey'
    | 'primary-inverted';
  overlayOpacityStart?: number;
  overlayOpacityEnd?: number;
}) {
  const alignment = {
    'top-left': 'top-0 left-0 text-left',
    'top-center': 'top-0',
    'top-right': 'top-0 right-0 text-right',
    'bottom-left': 'bottom-0 left-0 text-left',
    'bottom-center': 'bottom-0 mx-auto',
    'bottom-right': 'bottom-0 right-0 text-right',
  };

  const textAlignment = {
    'top-left': ' text-left',
    'top-center': 'text-center',
    'top-right': 'text-right',
    'bottom-left': 'text-left',
    'bottom-center': 'text-center',
    'bottom-right': 'text-right',
  };

  const buttonAlignment = {
    'top-left': 'mr-auto',
    'top-center': 'mx-auto',
    'top-right': 'ml-auto',
    'bottom-left': 'mr-auto',
    'bottom-center': 'mx-auto',
    'bottom-right': 'ml-auto',
  };

  return (
    <section className="relative justify-end flex flex-col w-full aspect-square md:aspect-auto">
      <div className="inset-0 grid flex-grow grid-flow-col auto-cols-fr -z-1">
        {spread?.reference && (
          <div className="overflow-clip">
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
        {displayContent && (
          <div
            className={`absolute sm:px-8 md:px-12 bg-gradient-to-t from-primary/${overlayOpacityStart} to-primary/${overlayOpacityEnd} text-contrast w-full h-full z-10`}
          >
            <div className="inner-content-wrapper relative w-full h-full">
              <div
                className={`inner-content flex flex-col items-baseline justify-between gap-4 px-6 py-8 absolute ${alignment[contentAlignment]}`}
              >
                {heading?.value && (
                  <Heading
                    format
                    as="h2"
                    size="display"
                    className={`w-full max-w-m text-${textColor} uppercase ${textAlignment[contentAlignment]}`}
                  >
                    {heading.value}
                  </Heading>
                )}
                {byline?.value && (
                  <Text
                    format
                    width="default"
                    as="p"
                    size="lead"
                    className={`text-${textColor} max-w-full w-full ${textAlignment[contentAlignment]}`}
                  >
                    {byline.value}
                  </Text>
                )}
                {cta?.value && (
                  <Button
                    size="lead"
                    to={ctaLink}
                    className={`uppercase ${buttonAlignment[contentAlignment]}`}
                    variant={buttonColor}
                  >
                    {cta.value}
                  </Button>
                )}
              </div>
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
