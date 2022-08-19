import {Divider, Heading} from '../index';
import {Image} from '@shopify/hydrogen';
import {MenuItemType} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

interface Metafield {
  value: string;
  reference?: object;
}

const title: {[key: string]: string} = {
  en: 'How to Use',
  es: 'Cómo Utilizar',
};

export function ProductSectionHowToMultipleImages({
  lang = 'en',
  theme = 'suavecito',
  howToUse1,
  howToUse2,
  howToUse3,
  productSectionHowToText,
  productSectionHowToEmbeddedVideo,
}: {
  lang?: 'en' | 'es';
  theme?: BrandTheme;
  howToUse1?: Metafield;
  howToUse2?: Metafield;
  howToUse3?: Metafield;
  productSectionHowToText: Metafield;
  productSectionHowToEmbeddedVideo: Metafield;
}) {
  const colors = {
    suavecito: 'text-black',
    suavecita: 'text-suave-pink',
    'premium blends': 'text-white',
    'firme club': 'text-black',
    'tres noir': 'text-black',
    'cerveza cito': 'text-black',
  };

  return (
    <section className="mb-[55px]">
      <Divider width="half" theme={theme} className="my-[55px]" />
      <Heading
        as="h3"
        size="heading"
        className={`uppercase text-center ${colors[theme]}`}
      >
        {title[lang]}
      </Heading>
      <div className={`pt-6 flex flex-col gap-6`}>
        <div
          className={`flex-1 flex flex-col ${!howToUse1 && 'justify-center'}`}
        >
          {productSectionHowToText && (
            <div
              className={`directions mb-[35px] ${
                theme === 'premium blends' && 'text-white'
              }`}
              dangerouslySetInnerHTML={{__html: productSectionHowToText.value}}
            />
          )}
          <div className="grid grid-rows-3 grid-cols-1 md:grid-rows-1 md:grid-cols-3 gap-4">
            {howToUse1 && (
              <div className="w-full h-full">
                <Image
                  className="w-full h-full object-cover"
                  // @ts-ignore
                  data={howToUse1.reference.image}
                  // @ts-ignore
                  alt={howToUse1?.reference?.altText || 'How to use'}
                />
              </div>
            )}
            {howToUse2 && (
              <div className="w-full h-full">
                <Image
                  className="w-full h-full object-cover"
                  // @ts-ignore
                  data={howToUse2.reference.image}
                  // @ts-ignore
                  alt={howToUse2?.reference?.altText || 'How to use'}
                />
              </div>
            )}
            {howToUse3 && (
              <div className="w-full h-full">
                <Image
                  className="w-full h-full object-cover"
                  // @ts-ignore
                  data={howToUse3.reference.image}
                  // @ts-ignore
                  alt={howToUse3?.reference?.altText || 'How to use'}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex-1">
          {productSectionHowToEmbeddedVideo && (
            <div
              className="video-wrapper"
              dangerouslySetInnerHTML={{
                __html: productSectionHowToEmbeddedVideo.value,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
