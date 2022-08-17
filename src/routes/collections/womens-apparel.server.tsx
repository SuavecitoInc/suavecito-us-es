import {CollectionFeaturedImages} from '~/components/index.server';

export default function Collection() {
  const handle = 'womens-apparel';
  return <CollectionFeaturedImages handle={handle} query={COLLECTION_QUERY} />;
}

import {
  FILTERED_COLLECTION_FRAGMENT,
  COLLECTION_PRODUCT_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

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
      products(first: $pageBy, after: $cursor) {
        nodes {
          ...CollectionProduct
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection1: collection(handle: "womens-shirts") {
      ...FilteredCollectionWithMetafield
    }
  }
`;
