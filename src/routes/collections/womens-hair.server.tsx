import {
  FILTERED_COLLECTION_FRAGMENT,
  COLLECTION_PRODUCT_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

import {CollectionFeaturedImages} from '~/components/index.server';

export default function Collection() {
  const handle = 'womens-hair';
  return (
    <CollectionFeaturedImages
      handle={handle}
      query={COLLECTION_QUERY}
      theme={'suavecita'}
    />
  );
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
    collectionSection1: collection(handle: "womens-styling") {
      ...FilteredCollectionWithMetafield
    }
    collectionSection2: collection(handle: "cleansing-treatment") {
      ...FilteredCollectionWithMetafield
    }
    collectionSection3: collection(handle: "hair-color-1") {
      ...FilteredCollectionWithMetafield
    }
    collectionSection4: collection(handle: "womens-tools-accessories") {
      ...FilteredCollectionWithMetafield
    }
  }
`;
