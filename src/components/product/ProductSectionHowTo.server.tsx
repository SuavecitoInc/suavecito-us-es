import {Divider, Heading} from '../index';
import {Image} from '@shopify/hydrogen';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionHowTo({
  theme = 'suavecito',
  productSectionHowToImage,
  productSectionHowToText,
  productSectionHowToEmbeddedVideo,
}: {
  theme?: 'suavecito' | 'suavecita';
  productSectionHowToImage?: Metafield;
  productSectionHowToText: Metafield;
  productSectionHowToEmbeddedVideo: Metafield;
}) {
  const colors = {
    suavecito: 'text-black',
    suavecita: 'text-suave-pink',
  };

  return (
    <section>
      <Divider width="half" className="my-[55px]" />
      <Heading
        as="h3"
        size="heading"
        className={`uppercase text-center ${colors[theme]}`}
      >
        How to Use
      </Heading>
      <div
        className={`pt-6 flex flex-col md:flex-row gap-6 ${
          productSectionHowToImage && 'border-b-2 border-black'
        }`}
      >
        <div
          className={`flex-1 flex flex-col ${
            !productSectionHowToImage && 'justify-center'
          }`}
        >
          {productSectionHowToText && (
            <div
              className="directions"
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
