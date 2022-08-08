import {CollectionFeaturedImages} from '~/components/index.server';

export default function Collection() {
  const handle = 'cosmetics';
  return <CollectionFeaturedImages handle={handle} query={COLLECTION_QUERY} />;
}

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

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
    collectionSection1: collection(handle: "lips") {
      id
      handle
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
    collectionSection2: collection(handle: "eyes") {
      id
      handle
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
    collectionSection3: collection(handle: "makeup-brushes") {
      id
      handle
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
