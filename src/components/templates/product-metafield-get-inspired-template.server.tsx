import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useServerAnalytics,
  useShopQuery,
  useUrl,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {
  PRODUCT_SECTION_FRAGMENT,
  VARIANT_METAFIELD_IMAGES_FRAGMENT,
  VARIANT_METAFIELD_COLOR_IMAGES_FRAGMENT,
  VARIANT_METAFIELD_LIFESTYLE_IMAGES_FRAGMENT,
  PRODUCT_SECTION_GET_INSPIRED_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {
  NotFound,
  Layout,
  ProductSectionContentGrid,
  ProductSectionHowTo,
  ProductSectionYouMayAlsoLike,
} from '~/components/index.server';
import {
  Heading,
  ProductOptionsVariantForm,
  ProductImages,
  ProductMetafieldImages,
  ProductSectionGetInspired,
  Section,
  Text,
} from '~/components';

export function ProductMetafieldGetInspiredTemplate({
  handle,
}: {
  handle: string;
}) {
  const LANG = 'ES';
  const {search} = useUrl();
  const params = new URLSearchParams(search);
  const initialVariant = params.get('variant');

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {
    data: {product, shop},
  } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      handle,
    },
    preload: true,
  });

  if (!product) {
    return <NotFound type="product" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
    },
  });

  const {
    images,
    title,
    vendor,
    descriptionHtml,
    options,
    variants,
    tags,
    productSectionFeaturedImage1,
    productSectionFeaturedImage2,
    productSectionDescription,
    productSectionListItemText1,
    productSectionListItemImage1,
    productSectionListItemText2,
    productSectionListItemImage2,
    productSectionListItemText3,
    productSectionListItemImage3,
    productSectionListItemText4,
    productSectionListItemImage4,
    productSectionHowToImage,
    productSectionHowToText,
    productSectionHowToEmbeddedVideo,
    getInspiredImage1,
    getInspiredImage2,
    getInspiredImage3,
    getInspiredImage4,
  } = product;

  const defaultOptionNames = options.map(
    (option: {name: string}) => option.name,
  );

  const productContentGridData = {
    productSectionFeaturedImage1,
    productSectionFeaturedImage2,
    productSectionDescription,
    productSectionListItemText1,
    productSectionListItemText2,
    productSectionListItemText3,
    productSectionListItemText4,
    productSectionListItemImage1,
    productSectionListItemImage2,
    productSectionListItemImage3,
    productSectionListItemImage4,
  };

  const productContentHowTo = {
    productSectionHowToImage,
    productSectionHowToText,
    productSectionHowToEmbeddedVideo,
  };

  const productContentGetInspired = {
    getInspiredImage1,
    getInspiredImage2,
    getInspiredImage3,
    getInspiredImage4,
  };

  return (
    <Layout theme={vendor.toLowerCase()}>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <ProductOptionsProvider
        data={product}
        initialVariantId={
          initialVariant
            ? `gid://shopify/ProductVariant/${initialVariant}`
            : undefined
        }
      >
        <div className="page-width">
          <Section padding="x" className="px-0">
            <div className="flex flex-col md:flex-row gap-10">
              {/* if metafield images exist  */}
              <Suspense>
                {variants.nodes[0]?.variantImage1 ? (
                  <ProductMetafieldImages className="flex-1" />
                ) : (
                  <ProductImages images={images.nodes} className="flex-1" />
                )}
              </Suspense>

              <div className="flex-1">
                <section className="">
                  <div className="grid gap-2">
                    <Heading as="h1" format className="whitespace-normal">
                      {title}
                    </Heading>
                    {vendor && (
                      <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                    )}
                  </div>
                  <Suspense>
                    <ProductOptionsVariantForm
                      lang={LANG}
                      theme={vendor.toLowerCase()}
                      optionNames={defaultOptionNames}
                      tags={tags}
                    />
                  </Suspense>
                </section>
              </div>
            </div>
          </Section>

          {/* Product Section Get Inspired */}
          {variants.nodes[0].variantLifestyleImage1 ||
            (getInspiredImage1 && (
              <ProductSectionGetInspired
                lang={LANG}
                theme="suavecita"
                {...productContentGetInspired}
              />
            ))}
        </div>
      </ProductOptionsProvider>

      <div className="page-width">
        {/* Product Section Grid */}
        {productSectionFeaturedImage1 && productSectionDescription && (
          <ProductSectionContentGrid lang={LANG} {...productContentGridData} />
        )}

        {/* Product Section How To */}
        {productSectionHowToText && productSectionHowToEmbeddedVideo && (
          <ProductSectionHowTo
            lang={LANG}
            theme="suavecita"
            {...productContentHowTo}
          />
        )}

        <ProductSectionYouMayAlsoLike lang={LANG} productId={product.id} />
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_SECTION_FRAGMENT}
  ${VARIANT_METAFIELD_IMAGES_FRAGMENT}
  ${VARIANT_METAFIELD_COLOR_IMAGES_FRAGMENT}
  ${VARIANT_METAFIELD_LIFESTYLE_IMAGES_FRAGMENT}
  ${PRODUCT_SECTION_GET_INSPIRED_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      descriptionHtml
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      options {
        name
      }
      images(first: 20) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      tags
      ...ProductSection
      ...ProductSectionGetInspired
      variants(first: 100) {
        nodes {
          id
          availableForSale
          quantityAvailable
          selectedOptions {
            name
            value
          }
          image {
            id
            url
            altText
            width
            height
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
          sku
          title
          unitPrice {
            amount
            currencyCode
          }
          ...VariantMetafieldImages
          ...VariantMetafieldColorImages
          ...VariantMetafieldLifestyleImages
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;
