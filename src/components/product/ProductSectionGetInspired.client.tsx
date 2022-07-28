import {Image, useProductOptions} from '@shopify/hydrogen';
import {Media, ProductVariant} from '@shopify/hydrogen/storefront-api-types';
import {Divider, Heading} from '../index';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionGetInspired({
  theme = 'suavecito',
  getInspiredImage1 = null,
  getInspiredImage2 = null,
  getInspiredImage3 = null,
  getInspiredImage4 = null,
}: {
  theme?: 'suavecito' | 'suavecita';
  getInspiredImage1?: null | Metafield;
  getInspiredImage2?: null | Metafield;
  getInspiredImage3?: null | Metafield;
  getInspiredImage4?: null | Metafield;
}) {
  const {selectedVariant} = useProductOptions();

  const colors = {
    suavecito: 'suave-red',
    suavecita: 'suave-pink',
  };

  let lifesStyleImage1: Metafield;
  let lifesStyleImage2: Metafield;
  let lifesStyleImage3: Metafield;
  let lifesStyleImage4: Metafield;

  if (getInspiredImage1) {
    lifesStyleImage1 = getInspiredImage1 as Metafield;
    lifesStyleImage2 = getInspiredImage2 as Metafield;
    lifesStyleImage3 = getInspiredImage3 as Metafield;
    lifesStyleImage4 = getInspiredImage4 as Metafield;
  } else {
    // @ts-ignore
    lifesStyleImage1 = selectedVariant?.variantLifestyleImage1 as Metafield;
    // @ts-ignore
    lifesStyleImage2 = selectedVariant?.variantLifestyleImage2 as Metafield;
    // @ts-ignore
    lifesStyleImage3 = selectedVariant?.variantLifestyleImage3 as Metafield;
    // @ts-ignore
    lifesStyleImage4 = selectedVariant?.variantLifestyleImage4 as Metafield;
  }

  return (
    <section className="w-full">
      <Divider width="full" className="my-[35px]" />
      <Heading
        as="h3"
        size="heading"
        className={`mb-[35px] uppercase text-center text-${colors[theme]}`}
      >
        GET INSPIRED
      </Heading>
      <div className="grid grid-cols-4 gap-4">
        {lifesStyleImage1 && (
          <div className="aspect-square">
            <MetafieldMedia
              scale={2}
              sizes={
                lifesStyleImage1?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                lifesStyleImage1?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={lifesStyleImage1?.reference ? 375 : 750}
              data={lifesStyleImage1?.reference as unknown as Media}
              loading="eager"
            />
          </div>
        )}

        {lifesStyleImage2 && (
          <div className="aspect-square">
            <MetafieldMedia
              scale={2}
              sizes={
                lifesStyleImage2?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                lifesStyleImage2?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={lifesStyleImage2?.reference ? 375 : 750}
              data={lifesStyleImage2?.reference as unknown as Media}
              loading="eager"
            />
          </div>
        )}

        {lifesStyleImage3 && (
          <div className="aspect-square">
            <MetafieldMedia
              scale={2}
              sizes={
                lifesStyleImage3?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                lifesStyleImage3?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={lifesStyleImage3?.reference ? 375 : 750}
              data={lifesStyleImage3?.reference as unknown as Media}
              loading="eager"
            />
          </div>
        )}

        {lifesStyleImage4 && (
          <div className="aspect-square">
            <MetafieldMedia
              scale={2}
              sizes={
                lifesStyleImage4?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                lifesStyleImage4?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={lifesStyleImage4?.reference ? 375 : 750}
              data={lifesStyleImage4?.reference as unknown as Media}
              loading="eager"
            />
          </div>
        )}
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
      alt={data?.alt || `Get Inspired`}
      className="block object-cover w-full h-full"
      // @ts-ignore
      data={data.image}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
