import {Divider, Heading} from '../index';
import {Image} from '@shopify/hydrogen';
import type {BrandTheme} from '~/types/suavecito';

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionHowTo({
  lang = LANG,
  theme = 'suavecito',
  productSectionHowToImage,
  productSectionHowToText,
  productSectionHowToEmbeddedVideo,
}: {
  lang?: 'EN' | 'ES';
  theme?: BrandTheme;
  productSectionHowToImage?: Metafield;
  productSectionHowToText: Metafield;
  productSectionHowToEmbeddedVideo: Metafield;
}) {
  const title: {[key: string]: string} = {
    EN: 'How to Use',
    ES: 'Cómo Utilizar',
  };

  const colors = {
    suavecito: 'text-black',
    suavecita: 'text-suave-pink',
    'premium blends': 'text-white',
    'firme club': 'text-black',
    'tres noir': 'text-black',
    'cerveza cito': 'text-black',
  };

  return (
    <section>
      <Divider width="half" theme={theme} className="my-[55px]" />
      <Heading
        as="h3"
        size="heading"
        className={`uppercase text-center ${colors[theme]}`}
      >
        {title[lang]}
      </Heading>
      <div
        className={`pt-6 flex flex-col md:flex-row gap-6 ${
          productSectionHowToImage &&
          `border-b-2 ${
            theme === 'premium blends' ? 'border-white' : 'border-black'
          }`
        }`}
      >
        <div
          className={`flex-1 flex flex-col ${
            !productSectionHowToImage && 'justify-center'
          }`}
        >
          {productSectionHowToText && (
            <div
              className={`directions ${
                theme === 'premium blends' && 'text-white'
              }`}
              dangerouslySetInnerHTML={{__html: productSectionHowToText.value}}
            />
          )}
          {productSectionHowToImage && (
            <Image
              // @ts-ignore
              data={productSectionHowToImage.reference.image}
              alt="Styling Tip"
            />
          )}
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
