import {
  COLLECTION_PRODUCT_VARIANT_IMAGE_FRAGMENT,
  FILTERED_COLLECTION_WITH_VARIANT_FRAGMENT,
} from '~/lib/suavecito-fragments';
import {MEDIA_FRAGMENT} from '~/lib/fragments';
import {gql} from '@shopify/hydrogen';

import {CollectionCollaborations} from '~/components/index.server';

export default function Collection() {
  const handle = 'collaborations';
  return <CollectionCollaborations handle={handle} query={COLLECTION_QUERY} />;
}

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
    collectionSection1: collection(handle: "suavecito-x-monsters") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection2: collection(handle: "suavecito-x-loser-machine") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection3: collection(handle: "suavecito-x-felix-the-cat-vol-2") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection4: collection(handle: "suavecito-x-mister-cartoon") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection5: collection(handle: "suavecito-x-cristocat") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection6: collection(handle: "suavecito-x-violent-gentlemen") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection7: collection(handle: "suavecito-x-fast-and-furious") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection8: collection(handle: "suavecito-x-frida-kahlo") {
      ...FilteredCollectionWithVariantImage
    }
    collectionSection9: collection(handle: "suavecito-x-loteria") {
      ...FilteredCollectionWithVariantImage
    }
  }
`;
