import {gql} from '@shopify/hydrogen';

export const PRODUCT_SECTION_FRAGMENT = gql`
  fragment ProductSection on Product {
    productSectionFeaturedImage1: metafield(
      namespace: "debut"
      key: "section_featured_image_1"
    ) {
      reference {
        ...Media
      }
    }
    productSectionFeaturedImage2: metafield(
      namespace: "debut"
      key: "section_featured_image_2"
    ) {
      reference {
        ...Media
      }
    }
    productSectionDescription: metafield(
      namespace: "debut"
      key: "section_product_description"
    ) {
      value
    }
    productSectionListItemText1: metafield(
      namespace: "debut"
      key: "section_list_item_1_text"
    ) {
      value
    }
    productSectionListItemText2: metafield(
      namespace: "debut"
      key: "section_list_item_2_text"
    ) {
      value
    }
    productSectionListItemText3: metafield(
      namespace: "debut"
      key: "section_list_item_3_text"
    ) {
      value
    }
    productSectionListItemText4: metafield(
      namespace: "debut"
      key: "section_list_item_4_text"
    ) {
      value
    }
    productSectionListItemImage1: metafield(
      namespace: "debut"
      key: "section_list_item_1_image"
    ) {
      reference {
        ...Media
      }
    }
    productSectionListItemImage2: metafield(
      namespace: "debut"
      key: "section_list_item_2_image"
    ) {
      reference {
        ...Media
      }
    }
    productSectionListItemImage3: metafield(
      namespace: "debut"
      key: "section_list_item_3_image"
    ) {
      reference {
        ...Media
      }
    }
    productSectionListItemImage4: metafield(
      namespace: "debut"
      key: "section_list_item_4_image"
    ) {
      reference {
        ...Media
      }
    }
  }
`;

export const VARIANT_METAFIELD_IMAGES_FRAGMENT = gql`
  fragment VariantMetafieldImages on ProductVariant {
    variantImage1: metafield(namespace: "debut", key: "variant_image_1") {
      reference {
        ...Media
      }
    }
    variantImage2: metafield(namespace: "debut", key: "variant_image_2") {
      reference {
        ...Media
      }
    }
    variantImage3: metafield(namespace: "debut", key: "variant_image_3") {
      reference {
        ...Media
      }
    }
    variantImage4: metafield(namespace: "debut", key: "variant_image_4") {
      reference {
        ...Media
      }
    }
    variantFragranceProfile: metafield(
      namespace: "debut"
      key: "variant_fragrance_profile"
    ) {
      value
    }
  }
`;
