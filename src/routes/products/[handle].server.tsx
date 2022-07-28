import {Suspense} from 'react';
import {
  gql,
  ProductOptionsProvider,
  Seo,
  ShopifyAnalyticsConstants,
  useLocalization,
  useRouteParams,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';

import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {PRODUCT_APPAREL_FRAGMENT} from '~/lib/suavecito-fragments';
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
} from '~/components';

export default function Product() {
  const {handle} = useRouteParams();
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
    apparelFit,
    apparelMaterial,
    apparelColor,
    apparelLogoFront,
    apparelLogoBack,
    sizeChart,
    oldSizeChart,
  } = product;

  const defaultOptionNames = options.map(
    (option: {name: string}) => option.name,
  );

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
      content: descriptionHtml,
    });
    // product size chart
    // let productSizeChartType: string | null = null;
    // if (sizeChart) {
    //   productSizeChartType = sizeChart.value;
    // } else if (oldSizeChart) {
    //   productSizeChartType = oldSizeChart.value;
    // }

    // tabs.push({
    //   title: 'Size Chart',
    //   content: productSizeChartType,
    // });

    return tabs;
  };

  const theme = vendor.toLowerCase();

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
                {variants.nodes[0]?.variantImage1 ? (
                  <ProductMetafieldImages className="flex-1" />
                ) : (
                  <ProductImages images={images.nodes} className="flex-1" />
                )}
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
                </section>
              </div>
            </div>
          </Section>
        </ProductOptionsProvider>

        {descriptionHtml && (
          <div className="grid gap-4 py-4">
            <ProductSectionInfoTabs theme={theme} tabs={getTabsContent()} />
          </div>
        )}

        <ProductSectionYouMayAlsoLike theme={theme} productId={product.id} />
      </div>
    </Layout>
  );
}

const PRODUCT_QUERY = gql`
  ${MEDIA_FRAGMENT}
  ${PRODUCT_APPAREL_FRAGMENT}
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
