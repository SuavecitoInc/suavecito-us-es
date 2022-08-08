import {Image, useLocalization} from '@shopify/hydrogen';
import {Media} from '@shopify/hydrogen/storefront-api-types';
import {Heading} from '../index';
import type {BrandTheme} from '~/types/suavecito';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionHowItLooks({
  theme = 'suavecito',
  howItLooksImage1,
  howItLooksImage2,
  howItLooksImage3,
  howItLooksImage4,
  howItLooksImage5,
  howItLooksImage6,
  howItLooksImage7,
  howItLooksImage8,
}: {
  theme?: BrandTheme;
  howItLooksImage1: Metafield | null;
  howItLooksImage2: Metafield | null;
  howItLooksImage3: Metafield | null;
  howItLooksImage4: Metafield | null;
  howItLooksImage5: Metafield | null;
  howItLooksImage6: Metafield | null;
  howItLooksImage7: Metafield | null;
  howItLooksImage8: Metafield | null;
}) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const title: {[key: string]: string} = {
    EN: 'How It Looks',
    ES: 'Como luce',
  };

  const images = [
    howItLooksImage1,
    howItLooksImage2,
    howItLooksImage3,
    howItLooksImage4,
    howItLooksImage5,
    howItLooksImage6,
    howItLooksImage7,
    howItLooksImage8,
  ];

  return (
    <section className="py-[55px]">
      <Heading
        as="h3"
        size="heading"
        className={`uppercase text-center mx-auto max-w-full mb-[20px] ${
          theme === 'premium blends' && 'text-white'
        }`}
      >
        {title[languageCode]}
      </Heading>
      <div className="flex flex-row gap-2 overflow-x-scroll">
        {images.map((image) => {
          if (image) {
            return (
              <MetafieldMedia
                // @ts-ignore
                key={image?.reference.id}
                scale={2}
                sizes={
                  image?.reference
                    ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                    : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
                }
                widths={image?.reference ? [500, 450, 700] : [500, 900, 1400]}
                width={image?.reference ? 375 : 750}
                data={image.reference as Media}
                loading="eager"
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </section>
  );
}

interface MetafieldMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

function MetafieldMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: MetafieldMediaProps) {
  return (
    <Image
      widths={widths}
      sizes={sizes}
      alt={data.alt || 'Marketing Banner Image'}
      className="block object-cover w-full h-full max-w-[75%] md:max-w-[60%] lg:max-w-[25%]"
      // @ts-ignore
      data={data.image}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
