import {Suspense} from 'react';
import {
  gql,
  type HydrogenRouteProps,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
  type HydrogenRequest,
  type HydrogenApiRouteOptions,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {
  PageHeader,
  ProductGrid,
  Section,
  Text,
  FeaturedProductGrid,
} from '~/components';
import {NotFound, Layout} from '~/components/index.server';
import {FeaturedProductRow} from '../collection/FeaturedProductRow.server';
import {HeroBanner} from '~/components/collection/HeroBanner';
import {BrandTheme} from '~/types/suavecito';

const pageBy = 48;

export function CollectionFeaturedImages({
  handle,
  query,
  theme = 'suavecito',
}: {
  handle: string;
  query: string;
  theme?: BrandTheme;
}) {
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();

  const COLLECTION_QUERY = query;

  const {data}: {data: any} = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });
  console.log('data', data);
  if (!data.collection) {
    return <NotFound type="collection" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: data.collection.id,
    },
  });
  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={data.collection} />
      </Suspense>
      <section>
        <HeroBanner collection={data.collection} />
      </section>
      {Array.from(Array(6)).map(
        (x, i) =>
          data[`collectionSection${i + 1}`] && (
            <div key={data[`collectionSection${i + 1}`].id}>
              <FeaturedProductRow
                theme={theme}
                collection={data[`collectionSection${i + 1}`]}
                url={`/collections/${
                  data[`collectionSection${i + 1}`].handle
                }?country=${country}`}
                position={(i + 1) % 2 !== 0 ? 'left' : 'right'}
              />
            </div>
          ),
      )}
    </Layout>
  );
}

// API endpoint that returns paginated products for this collection
// @see templates/demo-store/src/components/product/ProductGrid.client.tsx
export async function api(
  request: HydrogenRequest,
  {params, queryShop}: HydrogenApiRouteOptions,
) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', {
      status: 405,
      headers: {Allow: 'POST'},
    });
  }
  const url = new URL(request.url);

  const cursor = url.searchParams.get('cursor');
  const country = url.searchParams.get('country');
  const {handle} = params;

  return await queryShop({
    query: PAGINATE_COLLECTION_QUERY,
    variables: {
      handle,
      cursor,
      pageBy,
      country,
    },
  });
}

const PAGINATE_COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionPage(
    $handle: String!
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
