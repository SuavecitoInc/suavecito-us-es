import {
  FILTERED_COLLECTION_FRAGMENT,
  COLLECTION_PRODUCT_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

import {CollectionBestSellers} from '~/components/index.server';

export default function Collection() {
  return <CollectionBestSellers />;
}

const COLLECTION_QUERY = gql`
  ${FILTERED_COLLECTION_FRAGMENT}
  ${COLLECTION_PRODUCT_FRAGMENT}
  ${MEDIA_FRAGMENT}
  query CollectionDetails(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $pageBy: Int!
    $cursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
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
      products(
        first: $pageBy
        after: $cursor
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection1: collection(handle: "premium-blends") {
      ...FilteredCollectionWithMetafield
    }
  }
`;