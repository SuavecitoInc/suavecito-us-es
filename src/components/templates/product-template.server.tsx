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
import {
  PRODUCT_APPAREL_FRAGMENT,
  VARIANT_SALE_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {
  NotFound,
  Layout,
  ProductSectionYouMayAlsoLike,
} from '~/components/index.server';
import {
  Heading,
  ProductOptionsVariantForm,
  ProductImages,
  ProductMetafieldImages,
  Section,
  Text,
  ProductSectionInfoTabs,
  ProductViewEvent,
} from '~/components';

import {sizeCharts} from '~/data/size-charts/';

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

export function ProductTemplate({handle}: {handle: string}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

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
    apparelFit,
    apparelMaterial,
    apparelColor,
    apparelLogoFront,
    apparelLogoBack,
    sizeChart,
    oldSizeChart,
    spanishDescription,
  } = product;

  const defaultOptionNames = options.map(
    (option: {name: string}) => option.name,
  );

  const description =
    spanishDescription !== null && LANG === 'es'
      ? spanishDescription.value
      : descriptionHtml;

  let productSizeChart = '';
  const getTabsContent = () => {
    const tabs: {title: string; content: any}[] = [];
    // features
    if (
      (apparelFit || apparelMaterial || apparelColor) &&
      apparelLogoFront &&
      apparelLogoBack
    ) {
      const features: {title: string; content: {[key: string]: string}} = {
        title: 'Features',
        content: {},
      };
      if (apparelFit) features.content.fit = apparelFit.value;
      if (apparelMaterial) features.content.material = apparelMaterial.value;
      if (apparelColor) features.content.color = apparelColor.value;
      if (apparelLogoFront) features.content.logoFront = apparelLogoFront.value;
      if (apparelLogoBack) features.content.logoBack = apparelLogoBack.value;
      tabs.push(features);
    }
    // description
    tabs.push({
      title: 'Description',
      content: description,
    });
    // product size chart
    let productSizeChartType: string | null = null;
    if (sizeChart) {
      productSizeChartType = sizeChart.value;
      productSizeChart = sizeChart.value;
    } else if (oldSizeChart) {
      productSizeChartType = oldSizeChart.value;
      productSizeChart = oldSizeChart.value;
    }

    if (productSizeChartType) {
      const sizeChartData = sizeCharts[`size-chart-${productSizeChartType}`];
      if (sizeChartData)
        tabs.push({
          title: 'Size Chart',
          content: sizeChartData,
        });
    }

    return tabs;
  };

  const tabsContent = getTabsContent();

  const theme = vendor.toLowerCase();

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
        <ProductOptionsProvider data={product}>
          <Suspense>
            <ProductViewEvent viewedProduct={viewedProduct} />
          </Suspense>
          <Section padding="x" className="px-0">
            <div className="flex flex-col gap-10 md:flex-row">
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
                      className={`whitespace-normal ${
                        theme === 'premium blends' && 'text-white'
                      }`}
                    >
                      {title}
                    </Heading>
                    {vendor && (
                      <Text className={'opacity-50 font-medium'}>{vendor}</Text>
                    )}
                  </div>
                  {product.productType !== 'FGWP' && (
                    <Suspense>
                      <ProductOptionsVariantForm
                        lang={LANG}
                        theme={theme}
                        optionNames={defaultOptionNames}
                        tags={tags}
                      />
                    </Suspense>
                  )}
                  {/* display description here if no features, otherwise render tabs */}
                  {description && tabsContent.length === 1 && (
                    <div
                      className={`py-10 ${
                        theme === 'premium blends' && 'text-white'
                      }`}
                    >
                      <div
                        className="rte description"
                        dangerouslySetInnerHTML={{__html: description}}
                      />
                    </div>
                  )}
                </section>
              </div>
            </div>
          </Section>
        </ProductOptionsProvider>

        {description && tabsContent.length > 1 && (
          <div className="grid gap-4 py-4">
            <ProductSectionInfoTabs
              lang={LANG}
              theme={theme}
              tabs={tabsContent}
              sizeChartType={productSizeChart}
            />
          </div>
        )}
      </div>

      <div className={`w-full ${theme === 'premium blends' && 'bg-white'}`}>
        <div className="page-width">
          <ProductSectionYouMayAlsoLike lang={LANG} productId={product.id} />
        </div>
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_APPAREL_FRAGMENT}
  ${VARIANT_SALE_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      productType
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
      ...ProductApparel
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
          variantExcluded: metafield(
            namespace: "debut"
            key: "exclude_variant_online"
          ) {
            value
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
