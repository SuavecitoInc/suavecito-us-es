import {ReactNode} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  Media,
  Image as ImageType,
} from '@shopify/hydrogen/storefront-api-types';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionImageText({
  featuredImage,
  featuredText,
  loading = 'eager',
  imagePosition = 'right',
  items,
}: {
  featuredImage?: Metafield | null;
  featuredText?: Metafield | null;
  loading?: 'eager' | 'lazy';
  imagePosition?: 'left' | 'right';
  items?: {text: Metafield; image: Metafield}[];
}) {
  const renderTextContent = () => {
    return (
      <div className="flex-1 flex justify-center items-center py-4">
        {featuredText && (
          <div
            className={`text-justify ${
              imagePosition === 'left' ? 'md:pl-[35px]' : 'md:pr-[35px]'
            }`}
            dangerouslySetInnerHTML={{__html: featuredText.value}}
          />
        )}

        {items && (
          <div
            className={`list ${
              imagePosition === 'left' ? 'md:pl-[35px]' : 'md:md:pr-[35px]'
            }`}
          >
            {items.map((item) => {
              return (
                <div
                  key={item.text.value}
                  className="grid grid-cols-8 justify-center items-center"
                >
                  <div className="col-span-2">
                    {/* @ts-ignore */}
                    {item.image?.reference?.image && (
                      <Image
                        // @ts-ignore
                        data={item.image.reference?.image as ImageType}
                        alt={item.text.value}
                        width={75}
                      />
                    )}
                  </div>
                  <div className="col-span-6 text-xl font-bold">
                    {item.text.value}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`flex ${
        imagePosition === 'left' ? 'flex-col' : 'flex-col-reverse'
      } md:flex-row gap-6 md:gap-0`}
    >
      {imagePosition === 'right' && renderTextContent()}

      <div className="flex-1">
        {featuredImage && (
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
        )}
      </div>

      {imagePosition === 'left' && renderTextContent()}
    </div>
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
