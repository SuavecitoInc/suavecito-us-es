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

const pageBy = 48;

export function CollectionFeaturedImages({handle}: {handle: string}) {
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();

  const {
    data: {
      collection,
      collectionSection1,
      collectionSection2,
      collectionSection3,
      collectionSection4,
    },
    //data[collectionSection${i}]
  } = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });

  if (!collection) {
    return <NotFound type="collection" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });
  return (
    <Layout>
      <Suspense>
        <Seo type="collection" data={collection} />
      </Suspense>
      <section>
        <HeroBanner collection={collection} />
      </section>
      <section>
        <FeaturedProductRow
          key={collectionSection1.id}
          collection={collectionSection1}
          url={`/collections/${handle}?country=${country}`}
          position="left"
        />
        <FeaturedProductRow
          key={collectionSection2.id}
          collection={collectionSection2}
          url={`/collections/${handle}?country=${country}`}
          position="right"
        />
      </section>
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

const COLLECTION_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
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
    collectionSection1: collection(handle: "water-based-pomades") {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 100) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection2: collection(handle: "matte-pomades") {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 100) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection3: collection(handle: "oil-based-pomades") {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 100) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection4: collection(handle: "mens-styling") {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 100) {
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection5: collection(handle: "hair-care") {
      id
      title
      description
      seo {
        description
        title
      }
      products(first: 100) {
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
