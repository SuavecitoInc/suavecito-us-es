import {Image, Link} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';

import {Heading, Text} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function ResponsiveBanner({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  largeSpread,
  mediumSpread,
  smallSpread,
  top,
  displayHeading,
}: {
  byline: Metafield;
  cta: Metafield;
  handle: string;
  heading: Metafield;
  height?: 'full';
  loading?: 'eager' | 'lazy';
  spread: Metafield;
  largeSpread: Metafield;
  mediumSpread: Metafield;
  smallSpread: Metafield;
  top?: boolean;
  displayHeading?: boolean;
}) {
  return (
    <Link to={`/collections/${handle}`}>
      <section
        className={`reponsive-banner relative justify-end flex flex-col w-full ${
          top && '-mt-nav'
        }`}
      >
        <div className="inset-0 grid">
          {spread?.reference && (
            <div className="relative">
              <SpreadPicture
                scale={2}
                loading={loading}
                largeSpread={largeSpread}
                mediumSpread={mediumSpread}
                smallSpread={smallSpread}
              />
            </div>
          )}
        </div>
        {displayHeading && (
          <div className="absolute flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
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
            {cta?.value && <Text size="lead">{cta.value}</Text>}
          </div>
        )}
      </section>
    </Link>
  );
}

function SpreadPicture({
  largeSpread,
  mediumSpread,
  smallSpread,
  loading,
  scale,
}: {
  largeSpread: Metafield;
  mediumSpread: Metafield;
  smallSpread: Metafield;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
}) {
  const generateSrcSet = (url: string | undefined | null) => {
    if (typeof url !== 'string') return;
    return `${url} 500w, ${url} 900w, ${url} 1400`;
  };

  const largeMedia = largeSpread.reference as Media;
  const mediumMedia = mediumSpread.reference as Media;
  const smallMedia = smallSpread.reference as Media;

  return (
    <picture>
      <source
        media="(min-width: 1024px)"
        srcSet={generateSrcSet(largeMedia.previewImage?.url)}
      />
      <source
        media="(min-width: 481px)"
        srcSet={generateSrcSet(mediumMedia.previewImage?.url)}
      />
      <source
        media="(max-width: 480px)"
        srcSet={generateSrcSet(smallMedia.previewImage?.url)}
      />
      <Image
        widths={largeMedia ? [500, 450, 700] : [500, 900, 1400]}
        sizes={
          largeMedia
            ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
            : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
        }
        alt={largeMedia?.alt || 'Marketing Banner Image'}
        className="block object-cover w-full h-full"
        // @ts-ignore
        data={largeMedia.image}
        loading={loading}
        width={largeMedia ? 375 : 750}
        loaderOptions={{scale, crop: 'center'}}
      />
    </picture>
  );
}
