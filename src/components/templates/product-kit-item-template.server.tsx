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
  PRODUCT_SECTION_KIT_INCLUDES,
  VARIANT_SALE_FRAGMENT,
} from '~/lib/suavecito-fragments';
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
  Section,
  Text,
  ProductViewEvent,
} from '~/components';
import {useGetInitialVariant} from '~/hooks';

export function ProductKitItemTemplate({handle}: {handle: string}) {
  const {search} = useUrl();
  const params = new URLSearchParams(search);
  const initialVariant = params.get('variant');

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {
    data: {product, shop},
  }: any = useShopQuery({
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

  const {
    priceV2,
    id: variantId,
    sku,
    title: variantTitle,
  } = product.variants.nodes[0];

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product.id,
      products: [
        {
          product_gid: product.id,
          variant_gid: variantId,
          variant: variantTitle,
          name: product.title,
          brand: product.vendor,
          category: product.productType,
          price: priceV2.amount,
          sku,
        },
      ],
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
    spanishDescription,
  } = product;

  const {id} = useGetInitialVariant(initialVariant, variants.nodes);

  const defaultOptionNames = options.map(
    (option: {name: string}) => option.name,
  );

  const description =
    spanishDescription !== null && LANG === 'es'
      ? spanishDescription.value
      : descriptionHtml;

  const theme = vendor.toLowerCase();

  const kitProducts = [
    kitProduct1,
    kitProduct2,
    kitProduct3,
    kitProduct4,
    kitProduct5,
    kitProduct6,
  ]
    .filter((el) => el !== null)
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
    .filter((el) => el !== null)
    .map((el) => el.value);

  const viewedProduct = {
    vendor: product.vendor,
    title: product.title,
    handle: product.handle,
    type: product.productType,
    collections: product.collections.nodes.map(
      (el: {title: string}) => el.title,
    ),
  };

  return (
    <Layout theme={theme} isProduct={true}>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <div className="page-width">
        <ProductOptionsProvider data={product} initialVariantId={id}>
          <Suspense>
            <ProductViewEvent viewedProduct={viewedProduct} />
          </Suspense>
          <Section padding="x" className="px-0">
            <div className="flex flex-col gap-10 md:flex-row">
              {/* if metafield images exist  */}
              <Suspense>
                <ProductImages images={images.nodes} className="flex-1" />
              </Suspense>
              <div className="flex-1">
                <section>
                  <div className="grid gap-2">
                    <Heading as="h1" className="whitespace-normal">
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
                      dangerouslySetInnerHTML={{__html: description}}
                    />
                  </div>
                </section>
              </div>
            </div>
          </Section>
        </ProductOptionsProvider>

        {(kitProductVariants.length > 0 || kitProducts.length > 0) && (
          <div className="page-width">
            <ProductSectionKitIncludes
              lang={LANG}
              theme={theme}
              kitProducts={kitProducts}
              kitProductVariants={kitProductVariants}
            />
          </div>
        )}

        <ProductSectionYouMayAlsoLike
          lang={LANG}
          theme={theme}
          productId={product.id}
        />
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_SECTION_KIT_INCLUDES}
  ${VARIANT_SALE_FRAGMENT}
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
      handle
      productType
      collections(first: 10) {
        nodes {
          title
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
          ...VariantSale
        }
      }
      seo {
        description
        title
      }
      spanishDescription: metafield(
        namespace: "debut"
        key: "section_product_description_es"
      ) {
        value
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
