import {Image} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Text, Button} from '~/components';

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
  sectionHeight = 'small',
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
    | 'top-right'
    | 'center-center'
    | 'bottom-left'
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
  sectionHeight?: 'x-small' | 'small' | 'medium' | 'large';
}) {
  const alignment = {
    'top-left': 'top-0 left-0 text-left',
    'top-right': 'top-0 right-0 text-right',
    'center-center': 'top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-0 left-0 text-left',
    'bottom-right': 'bottom-0 right-0 text-right',
  };

  const textAlignment = {
    'top-left': ' text-left',
    'top-right': 'text-right',
    'center-center': 'text-center',
    'bottom-left': 'text-left',
    'bottom-right': 'text-right',
  };

  const buttonAlignment = {
    'top-left': 'mr-auto',
    'top-right': 'ml-auto',
    'center-center': 'mx-auto',
    'bottom-left': 'mr-auto',
    'bottom-right': 'ml-auto',
  };

  const height = {
    'x-small': 'aspect-square md:aspect-[16/5] lg:aspect-[16/3]',
    small: 'aspect-square md:aspect-[16/5]',
    medium: 'aspect-square md:aspect-[16/7]',
    large: 'aspect-square md:aspect-[16/9]',
  };

  return (
    <section className="relative justify-end flex flex-col w-full">
      <div className="inset-0 grid flex-grow grid-flow-col auto-cols-fr -z-1">
        {spread?.reference && (
          <div className={height[sectionHeight]}>
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
            <div className="page-width inner-content-wrapper relative h-full">
              <div
                className={`inner-content flex flex-col items-baseline justify-between gap-4 px-6 py-8 absolute ${alignment[contentAlignment]}`}
              >
                {heading?.value && (
                  <h2
                    className={`w-full max-w-m text-${textColor} uppercase drop-shadow-lg ${textAlignment[contentAlignment]} font-bold text-3xl lg:text-4xl`}
                  >
                    {heading.value}
                  </h2>
                )}
                {byline?.value && (
                  <Text
                    format
                    width="default"
                    as="p"
                    size="lead"
                    className={`text-${textColor} max-w-full w-full drop-shadow-lg ${textAlignment[contentAlignment]}`}
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
