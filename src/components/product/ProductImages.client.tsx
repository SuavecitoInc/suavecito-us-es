import {useEffect, useState, useCallback} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  ImageEdge,
  Image as ImageType,
} from '@shopify/hydrogen/storefront-api-types';
import {useProductOptions} from '@shopify/hydrogen';

/**
 * A client component for product images
 */
export function ProductImages({
  images,
  className,
}: {
  images: ImageEdge['node'][];
  className?: string;
}) {
  const {selectedVariant} = useProductOptions();

  const [featuredImage, setFeaturedImage] = useState<ImageType>(images[0]);

  const [activeThumbnailId, setActiveThumbnailId] = useState<string>(
    images[0].id as string,
  );

  const findImageById = useCallback(
    (id: string) => images.find((image) => image.id === id),
    [images],
  );

  // change featured image on variant change
  useEffect(() => {
    // only change image if more than 1 option
    if (selectedVariant?.image && selectedVariant?.selectedOptions) {
      const variantImage = selectedVariant?.image;
      // find image
      const foundImage = findImageById(variantImage.id as string);
      if (foundImage) {
        setFeaturedImage(foundImage);
        setActiveThumbnailId(variantImage?.id as string);
      }
    }
  }, [selectedVariant, findImageById]);

  const handleImageChange = (id: string) => {
    // find by id
    const foundImage = findImageById(id);

    if (foundImage) {
      setFeaturedImage(foundImage);
      setActiveThumbnailId(id);
    }
  };

  return (
    <div
      className={`product-images md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
    >
      <div className="featured-image w-full">
        {featuredImage && (
          <SpreadMedia
            scale={2}
            sizes={
              featuredImage
                ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
            }
            widths={featuredImage ? [500, 450, 700] : [500, 900, 1400]}
            width={featuredImage ? 375 : 750}
            data={featuredImage}
            loading="eager"
          />
        )}
      </div>
      <div className="product-thumbnails pt-5 grid grid-cols-4 gap-3">
        {images.map((image) => {
          return (
            <div
              key={image.id}
              className={`thumbnail-image cursor-pointer p-1 ${
                activeThumbnailId === image.id ? 'border-2 border-black' : ''
              }`}
              onClick={() => handleImageChange(image.id as string)}
              aria-hidden="true"
              aria-current={activeThumbnailId === image.id && true}
            >
              <SpreadMedia
                scale={2}
                sizes={
                  image.id
                    ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                    : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
                }
                widths={image ? [500, 450, 700] : [500, 900, 1400]}
                width={image ? 375 : 750}
                data={image as any}
                loading="eager"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface SpreadMediaProps {
  data: ImageType;
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
      alt={data.altText || 'Marketing Banner Image'}
      className="block object-cover w-full h-full"
      // @ts-ignore
      data={data}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
