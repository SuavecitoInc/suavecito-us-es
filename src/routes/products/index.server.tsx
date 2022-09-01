import {Suspense} from 'react';
import {
  useShopQuery,
  gql,
  useLocalization,
  type HydrogenRequest,
  type HydrogenApiRouteOptions,
  Seo,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PAGINATION_SIZE, PRODUCT_FILTER_TAG} from '~/lib/const';
import {ProductGrid, PageHeader, Section} from '~/components';
import {Layout} from '~/components/index.server';
import type {Collection} from '@shopify/hydrogen/storefront-api-types';

// if product filter tag set this will filter the collection by tag
const PRODUCT_FILTER_QUERY: false | string = PRODUCT_FILTER_TAG
  ? `tag:${PRODUCT_FILTER_TAG}`
  : '';

export default function AllProducts() {
  return (
    <Layout>
      <Seo type="page" data={{title: 'All Products'}} />
      <PageHeader heading="All Products" variant="allCollections" />
      <Section>
        <Suspense>
          <AllProductsGrid />
        </Suspense>
      </Section>
    </Layout>
  );
}

function AllProductsGrid() {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery<any>({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      country: countryCode,
      language: languageCode,
      pageBy: PAGINATION_SIZE,
      tagFilter: PRODUCT_FILTER_QUERY,
    },
    preload: true,
  });

  const products = data.products;

  return (
    <ProductGrid
      key="products"
      url={`/products?country=${countryCode}`}
      collection={{products} as Collection}
    />
  );
}

// API to paginate products
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
    query: PAGINATE_ALL_PRODUCTS_QUERY,
    variables: {
      handle,
      cursor,
      pageBy: PAGINATION_SIZE,
      country,
      tagFilter: PRODUCT_FILTER_QUERY,
    },
  });
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
    $tagFilter: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor, query: $tagFilter) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;

const PAGINATE_ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query ProductsPage(
    $pageBy: Int!
    $cursor: String
    $country: CountryCode
    $language: LanguageCode
    $tagFilter: String
  ) @inContext(country: $country, language: $language) {
    products(first: $pageBy, after: $cursor, query: $tagFilter) {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
