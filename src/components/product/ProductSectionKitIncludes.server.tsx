import {gql, useShopQuery, Link, Image} from '@shopify/hydrogen';
import {Divider, Heading} from '../index';
import {Media} from '@shopify/hydrogen/storefront-api-types';
import {BrandTheme} from '~/types/suavecito';

const LANG = import.meta.env.LANGUAGE;

export function ProductSectionKitIncludes({
  lang = LANG,
  theme = 'suavecito',
  kitProducts,
  kitProductVariants,
}: {
  lang?: 'EN' | 'ES';
  theme: BrandTheme;
  kitProducts: {value: string}[];
  kitProductVariants: {value: string}[];
}) {
  const title = lang === 'ES' ? `Qué está incluido` : `What's Included`;

  const {
    data: {nodes: products},
  } = useShopQuery({
    query: KIT_PRODUCT_QUERY,
    variables: {
      kitProducts,
    },
    preload: true,
  });

  const {
    data: {nodes: productVariants},
  } = useShopQuery({
    query: KIT_PRODUCT_VARIANT_QUERY,
    variables: {
      kitProductVariants,
    },
    preload: true,
  });

  const items = [...productVariants, ...products].filter((el) => el !== null);

  const itemsLength = items.length;

  const width: {[key: number]: string} = {
    1: 'lg:basis-[30%]',
    2: 'lg:basis-[30%]',
    3: 'lg:basis-[33%]',
    4: 'lg:basis-[25%]',
    5: 'lg:basis-[20%]',
    6: 'lg:basis-[20%]',
    8: 'lg:basis-[20%]',
    9: 'lg:basis-[20%]',
    10: 'lg:basis-[20%]',
  };

  const rowStyles = `flex flex-row text-center ${
    itemsLength <= 3 && 'lg:justify-center'
  }`;

  const textColor: {[key: string]: string} = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
    'premium blends': 'text-suave-red',
    'firme club': 'text-suave-red',
    'cerveza cito': 'text-suave-red',
    'tres noir': 'text-suave-red',
  };

  const hoverTextColor: {[key: string]: string} = {
    suavecito: 'hover:text-suave-red-focus',
    suavecita: 'hover:text-suave-pink-focus',
    'premium blends': 'hover:text-suave-red-focus',
    'firme club': 'hover:text-suave-red-focus',
    'cerveza cito': 'hover:text-suave-red-focus',
    'tres noir': 'hover:text-suave-red-focus',
  };

  return (
    <section>
      <Divider width="half" className="my-[35px]" />
      <Heading as="h3" size="heading" className="text-center">
        {title}
      </Heading>
      <div className="w-full overflow-scroll">
        <div className="w-full max-w-[500vw] md:max-w-full h-auto overflow-x-scroll">
          <div className={rowStyles}>
            {items.map((el) => (
              <div
                key={`image-${el.id}`}
                className={`p-4 grow-1 shrink-0 basis-[60%] md:basis-[40%] ${width[itemsLength]}`}
              >
                {/* <Link to={`/products${el.product.link}`}> */}
                <FeaturedMedia
                  scale={2}
                  sizes={
                    el.variants
                      ? el.featuredImage
                      : el.image
                      ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                      : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
                  }
                  widths={
                    el.variants
                      ? el.featuredImage
                      : el.image
                      ? [500, 450, 700]
                      : [500, 900, 1400]
                  }
                  width={el.featuredImage || el.image ? 375 : 750}
                  data={
                    el.variants
                      ? (el.featuredImage as unknown as Media)
                      : (el.image as unknown as Media)
                  }
                  loading="eager"
                />
                {/* </Link> */}
              </div>
            ))}
          </div>

          <div className={rowStyles}>
            {items.map((el) => (
              <div
                key={`title-${el.id}`}
                className={`${textColor[theme]} border-x-2 border-white uppercase odd:bg-[#cccccc] even:bg-[#989898] p-2 text-suave-red font-bold grow-1 shrink-0 basis-[60%] md:basis-[40%] ${width[itemsLength]}`}
              >
                {el.variants ? el.title : el.product.title}
              </div>
            ))}
          </div>

          <div className={rowStyles}>
            {items.map((el) => (
              <div
                key={`features-${el.id}`}
                className={`border-x-2 border-white even:bg-[#C8C8C8] py-2 px-4 grow-1 shrink-0 basis-[60%] md:basis-[40%] ${width[itemsLength]} text-left`}
              >
                <p>Features:</p>
                {el.features && (
                  <div
                    className="metafield-features"
                    dangerouslySetInnerHTML={{__html: el.features.value}}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={rowStyles}>
            {items.map((el) => (
              <div
                key={`price-${el.id}`}
                className={`border-x-2 border-white even:bg-[#C8C8C8] p-2 grow-1 shrink-0 basis-[60%] md:basis-[40%] ${width[itemsLength]}`}
              >
                <p className="font-bold">
                  Value: $
                  {`${
                    el.variants ? el.variants.edges[0].node.price : el.price
                  }`}
                </p>
              </div>
            ))}
          </div>

          <div className={rowStyles}>
            {items.map((el) => (
              <div
                key={`handle-${el.id}`}
                className={`${textColor[theme]} ${hoverTextColor[theme]} border-x-2 border-white even:bg-[#C8C8C8] p-2 text-suave-red grow-1 shrink-0 basis-[60%] md:basis-[40%] ${width[itemsLength]}`}
              >
                <Link
                  to={`/products/${
                    el.variants ? el.handle : el.product.handle
                  }`}
                >
                  Learn More &gt;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
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
      data={data}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}

const KIT_PRODUCT_QUERY = gql`
  query KitProduct($kitProducts: [ID!]!) {
    nodes(ids: $kitProducts) {
      ... on Product {
        id
        handle
        title
        featuredImage {
          url
          altText
          width
          height
        }
        features: metafield(namespace: "debut", key: "product_features") {
          value
        }
        variants(first: 1) {
          edges {
            node {
              id
              price
              title
            }
          }
        }
      }
    }
  }
`;

const KIT_PRODUCT_VARIANT_QUERY = gql`
  query KitProductVariant($kitProductVariants: [ID!]!) {
    nodes(ids: $kitProductVariants) {
      ... on ProductVariant {
        id
        price
        title
        image {
          url
          altText
          width
          height
        }
        product {
          handle
          title
        }
        features: metafield(namespace: "debut", key: "variant_features") {
          value
        }
      }
    }
  }
`;
