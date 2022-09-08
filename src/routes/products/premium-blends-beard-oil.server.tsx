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
  VARIANT_FRAGRANCE_FRAGMENT,
  PRODUCT_SECTION_HOW_TO_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {
  NotFound,
  Layout,
  ProductSectionContentGrid,
  ProductSectionHowToMultipleImages,
  ProductSectionYouMayAlsoLike,
} from '~/components/index.server';
import {
  Heading,
  ProductOptionsVariantForm,
  ProductMetafieldImages,
  ProductImages,
  Section,
  Text,
} from '~/components';
import {useGetInitialVariant} from '~/hooks';

export default function Product() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;
  const handle = 'premium-blends-beard-oil';

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
    title,
    vendor,
    options,
    tags,
    variants,
    images,
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
    productSectionHowToText,
    productSectionHowToEmbeddedVideo,
    howToUse1,
    howToUse2,
    howToUse3,
  } = product;

  const {id} = useGetInitialVariant(initialVariant, variants.nodes);

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
    howToUse1,
    howToUse2,
    howToUse3,
    productSectionHowToText,
    productSectionHowToEmbeddedVideo,
  };

  return (
    <Layout theme={product.vendor.toLowerCase()} isProduct={true}>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <div className="page-width">
        <ProductOptionsProvider data={product} initialVariantId={id}>
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
                <section>
                  <div className="grid gap-2">
                    <Heading
                      as="h1"
                      format
                      className="whitespace-normal text-white"
                    >
                      {title}
                    </Heading>
                    {vendor && (
                      <Text className={'text-white opacity-50 font-medium'}>
                        {vendor}
                      </Text>
                    )}
                  </div>
                  <Suspense>
                    <ProductOptionsVariantForm
                      lang={LANG}
                      theme="premium blends"
                      optionNames={defaultOptionNames}
                      tags={tags}
                    />
                  </Suspense>
                </section>
              </div>
            </div>
          </Section>
        </ProductOptionsProvider>

        {/* check if productSectionFeaturedImage1 && productSectionDescription are set */}
        {productSectionFeaturedImage1 && productSectionDescription && (
          <ProductSectionContentGrid
            lang={LANG}
            theme="premium blends"
            {...productContentGridData}
          />
        )}

        {/* Product Section How To */}
        {productSectionHowToText && howToUse1 && (
          <ProductSectionHowToMultipleImages
            lang={LANG}
            theme="premium blends"
            {...productContentHowTo}
          />
        )}
      </div>

      <div className="w-full bg-white">
        <div className="page-width">
          <ProductSectionYouMayAlsoLike lang={LANG} productId={product.id} />
        </div>
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_SECTION_FRAGMENT}
  ${PRODUCT_SECTION_HOW_TO_FRAGMENT}
  ${VARIANT_METAFIELD_IMAGES_FRAGMENT}
  ${VARIANT_FRAGRANCE_FRAGMENT}
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
      ...ProductSectionHowTo
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
          ...VariantFragrance
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
