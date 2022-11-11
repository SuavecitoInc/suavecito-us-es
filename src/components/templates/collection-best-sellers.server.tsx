import {Suspense} from 'react';
import {
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useShopQuery,
  gql,
  CacheLong,
} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';

import {Layout, ThreeImageBanner} from '~/components/index.server';

import {
  FreeGiftWithPurchaseProgressBar,
  CollectionImageCarousel,
  ProductGridItem,
  ProductColorSwatches,
  Button,
} from '~/components';
import {BrandTheme} from '~/types/suavecito';

import {
  bestSellersBannerData,
  bestSellerCollectionsSlideData,
  bestSellerCollectionsData,
} from '~/data/collection-best-sellers';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {COLLECTION_PRODUCT_FRAGMENT} from '~/lib/suavecito-fragments';

import {
  FGWP_ENABLED,
  FGWP_SINGLE_TIER_ENABLED,
} from '~/data/free-gift-with-purchase';

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

export function CollectionBestSellers({
  theme = 'suavecito',
}: {
  theme?: BrandTheme;
}) {
  const title = LANG === 'es' ? 'Más Vendidos' : 'Bestsellers';

  const {image1, image2, image3, link1, link2, link3} = bestSellersBannerData;

  const threeImages = {
    image1,
    link1,
    image2,
    link2,
    image3,
    link3,
  };

  return (
    <Layout theme={theme} showTopPadding={false}>
      <Suspense>
        <Seo type="collection" data={{title}} />
      </Suspense>
      {FGWP_ENABLED && !FGWP_SINGLE_TIER_ENABLED && (
        <ThreeImageBanner {...threeImages} />
      )}
      {FGWP_ENABLED && !FGWP_SINGLE_TIER_ENABLED && (
        <FreeGiftWithPurchaseProgressBar />
      )}
      <CollectionImageCarousel slideData={bestSellerCollectionsSlideData} />
      <div className="page-width">
        {bestSellerCollectionsData.map((collection, index) => (
          <>
            <BestSellerProducts
              key={collection.handle}
              count={8}
              handle={collection.handle}
              title={collection.title}
            />
            {index !== bestSellerCollectionsData.length - 1 && <hr />}
          </>
        ))}
      </div>
    </Layout>
  );
}

function ProductGrid({
  products,
  theme = 'suavecito',
}: {
  products: Product[];
  theme?: BrandTheme;
}) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <ProductGridItem product={product} theme={theme} />
          {/* @ts-ignore */}
          {product.variants.nodes[0].variantColorImage && (
            <ProductColorSwatches product={product} />
          )}
        </div>
      ))}
    </>
  );
}

function BestSellerProducts({
  count,
  theme = 'suavecito',
  handle,
  title,
}: {
  count: number;
  theme?: BrandTheme;
  handle: string;
  title: string;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {data}: any = useShopQuery({
    query: BEST_SELLERS_QUERY,
    variables: {
      count,
      handle,
    },
    cache: CacheLong(),
    preload: true,
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: data.collection.id,
    },
  });

  return (
    <section className="my-10">
      <h3 className="mb-10 text-3xl font-bold uppercase">{title}</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <ProductGrid products={data.collection.products.nodes} theme={theme} />
      </div>
      <div className="flex justify-end w-full mt-10">
        <Button
          size="lead"
          to={`/collections/${handle}`}
          className="uppercase"
          variant={theme}
        >
          {LANG === 'es' ? 'Ver más' : 'View More'}
        </Button>
      </div>
    </section>
  );
}

const BEST_SELLERS_QUERY = gql`
  ${COLLECTION_PRODUCT_FRAGMENT}
  ${MEDIA_FRAGMENT}
  query bestSellers(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
    $handle: String
  ) @inContext(country: $countryCode, language: $languageCode) {
    collection(handle: $handle) {
      products(
        first: $count
        filters: {
          productMetafield: {
            namespace: "suave"
            key: "hydrogen_es_enabled"
            value: "true"
          }
        }
      ) {
        nodes {
          ...CollectionProduct
        }
      }
    }
  }
`;
