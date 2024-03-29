import {useEffect, useState} from 'react';
import {Image, useProductOptions} from '@shopify/hydrogen';
import type {Media} from '@shopify/hydrogen/storefront-api-types';
import type {ProductVariant} from '@shopify/hydrogen/storefront-api-types';

/**
 * A client component for product metafield images
 */
export function ProductMetafieldImages({className}: {className?: string}) {
  interface Metafield {
    value: string;
    reference?: object;
  }

  interface SelectedVariant extends ProductVariant {
    variantImage1?: Metafield;
    variantImage2?: Metafield;
    variantImage3?: Metafield;
    variantImage4?: Metafield;
  }

  const selectedVariant = useProductOptions()
    .selectedVariant as SelectedVariant;

  const [featuredImage, setFeaturedImage] = useState(
    selectedVariant.variantImage1?.reference,
  );

  const [activeThumbnail, setActiveThumbnail] = useState<number>(1);

  // change featured image on variant change
  useEffect(() => {
    setFeaturedImage(selectedVariant.variantImage1?.reference);
    setActiveThumbnail(1);
  }, [selectedVariant]);

  const handleImageChange = (index: number) => {
    const variantImage = `variantImage${index}`;
    const imageMetafield = selectedVariant[
      variantImage as keyof typeof selectedVariant
    ] as Metafield;

    setFeaturedImage(imageMetafield?.reference);
    setActiveThumbnail(index);
  };

  return (
    <div
      className={`product-images md:grid-flow-row hiddenScroll md:p-0 md:overflow-x-auto md:grid-cols-2 ${className}`}
    >
      <div className="w-full featured-image">
        {/* {featuredImage && (
          <SpreadMedia
            scale={2}
            sizes={
              featuredImage
                ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                : '(min-width: 80em) 1400px, (min-width: 48em) 500px, 900px'
            }
            widths={featuredImage ? [500, 450, 700] : [500, 900, 1400]}
            width={featuredImage ? 375 : 750}
            data={featuredImage as Media}
            loading="eager"
          />
        )} */}
        {featuredImage && (
          <SpreadMedia
            scale={2}
            sizes="(min-width: 80em) 700px, (min-width: 48em) 450px, 500px"
            widths={[500, 450, 700]}
            width={375}
            data={featuredImage as Media}
            loading="eager"
          />
        )}
      </div>
      <div className="flex gap-3 pt-5 product-thumbnails">
        {Array.from([1, 2, 3, 4]).map((i) => {
          const variantImage = `variantImage${i}`;
          const imageMetafield = selectedVariant[
            variantImage as keyof typeof selectedVariant
          ] as Metafield;
          return (
            <div
              key={i}
              className={`thumbnail-image flex-1 cursor-pointer p-1 aspect-square ${
                activeThumbnail === i ? 'border-2 border-black' : ''
              }`}
              onClick={() => handleImageChange(i)}
              aria-hidden="true"
              aria-current={activeThumbnail === i && true}
            >
              {imageMetafield?.reference && (
                <SpreadMedia
                  scale={2}
                  sizes="(min-width: 80em) 300px, (min-width: 48em) 100px, 200px"
                  widths={[300, 100, 200]}
                  width={300}
                  data={imageMetafield.reference as Media}
                  loading="eager"
                />
              )}
              {/* {imageMetafield?.reference && (
                <SpreadMedia
                  scale={2}
                  sizes="(min-width: 80em) 700px, (min-width: 48em) 450px, 500px"
                  widths={[500, 450, 700]}
                  width={375}
                  data={imageMetafield.reference as Media}
                  loading="eager"
                />
              )} */}
            </div>
          );
        })}
      </div>
    </div>
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
