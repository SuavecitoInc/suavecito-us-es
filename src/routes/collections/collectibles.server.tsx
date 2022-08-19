import {CollectionFeaturedImages} from '~/components/index.server';
export default function Collection() {
  const handle = 'collectibles';
  return <CollectionFeaturedImages handle={handle} query={COLLECTION_QUERY} />;
}

import {
  COLLECTION_PRODUCT_VARIANT_IMAGE_FRAGMENT,
  FILTERED_COLLECTION_WITH_VARIANT_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

const COLLECTION_QUERY = gql`
  ${FILTERED_COLLECTION_WITH_VARIANT_FRAGMENT}
  ${COLLECTION_PRODUCT_VARIANT_IMAGE_FRAGMENT}
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
          ...CollectionProductWithVariantImage
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
    collectionSection1: collection(handle: "suavecito-collectibles") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection2: collection(handle: "suavecita-collectibles") {
      ...FilteredCollectionWithVariantImage
    }
  }
`;
