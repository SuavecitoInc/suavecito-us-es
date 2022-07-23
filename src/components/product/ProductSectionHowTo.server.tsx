import {Divider, Heading} from '../index';
import {Image} from '@shopify/hydrogen';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionHowTo({
  productSectionHowToImage,
  productSectionHowToText,
  productSectionHowToEmbeddedVideo,
}: {
  productSectionHowToImage: Metafield;
  productSectionHowToText: Metafield;
  productSectionHowToEmbeddedVideo: Metafield;
}) {
  return (
    <section>
      <Divider width="half" className="my-[55px]" />
      <Heading as="h3" size="heading" className="uppercase text-center">
        How to Use
      </Heading>
      <div className="pt-6 flex flex-col md:flex-row gap-6 border-b-2 border-black">
        <div className="flex-1 flex flex-col">
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
