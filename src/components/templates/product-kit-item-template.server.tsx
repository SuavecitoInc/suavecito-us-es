import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {PRODUCT_SECTION_KIT_INCLUDES} from '~/lib/suavecito-fragments';
import {
  NotFound,
  Layout,
  ProductSectionYouMayAlsoLike,
  ProductSectionKitIncludes,
} from '~/components/index.server';
import {
  Heading,
  ProductOptionsVariantForm,
  ProductImages,
  ProductMetafieldImages,
  Section,
  Text,
  ProductSectionInfoTabs,
} from '~/components';

export function ProductKitItemTemplate({handle}: {handle: string}) {
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
    kitProduct1,
    kitProduct2,
    kitProduct3,
    kitProduct4,
    kitProduct5,
    kitProduct6,
    kitProductVariant1,
    kitProductVariant2,
    kitProductVariant3,
    kitProductVariant4,
    kitProductVariant5,
    kitProductVariant6,
    kitProductVariant7,
    kitProductVariant8,
    kitProductVariant9,
    kitProductVariant10,
  } = product;

  const defaultOptionNames = options.map(
    (option: {name: string}) => option.name,
  );

  const theme = vendor.toLowerCase();

  const kitProducts = [
    kitProduct1,
    kitProduct2,
    kitProduct3,
    kitProduct4,
    kitProduct5,
    kitProduct6,
  ]
    .filter((el) => el != null)
    .map((el) => el.value);

  const kitProductVariants = [
    kitProductVariant1,
    kitProductVariant2,
    kitProductVariant3,
    kitProductVariant4,
    kitProductVariant5,
    kitProductVariant6,
    kitProductVariant7,
    kitProductVariant8,
    kitProductVariant9,
    kitProductVariant10,
  ]
    .filter((el) => el != null)
    .map((el) => el.value);

  return (
    <Layout theme={theme}>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <div className="page-width">
        <ProductOptionsProvider data={product}>
          <Section padding="x" className="px-0">
            <div className="flex flex-col md:flex-row gap-10">
              {/* if metafield images exist  */}
              <Suspense>
                <ProductImages images={images.nodes} className="flex-1" />
              </Suspense>
              <div className="flex-1">
                <section>
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
                      theme={theme}
                      optionNames={defaultOptionNames}
                      tags={tags}
                    />
                  </Suspense>
                  <div className="py-10">
                    <div
                      className="description"
                      dangerouslySetInnerHTML={{__html: descriptionHtml}}
                    />
                  </div>
                </section>
              </div>
            </div>
          </Section>
        </ProductOptionsProvider>

        <div className="page-width">
          <ProductSectionKitIncludes
            kitProducts={kitProducts}
            kitProductVariants={kitProductVariants}
          />
        </div>

        <ProductSectionYouMayAlsoLike theme={theme} productId={product.id} />
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_SECTION_KIT_INCLUDES}
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
      ...ProductSectionKitIncludes
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
