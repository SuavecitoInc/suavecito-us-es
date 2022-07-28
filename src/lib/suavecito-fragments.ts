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
    productSectionHowToImage: metafield(
      namespace: "debut"
      key: "section_how_to_image"
    ) {
      reference {
        ...Media
      }
    }
    productSectionHowToText: metafield(
      namespace: "debut"
      key: "section_how_to"
    ) {
      value
    }
    productSectionHowToEmbeddedVideo: metafield(
      namespace: "debut"
      key: "video_embed"
    ) {
      value
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

export const VARIANT_METAFIELD_LIFESTYLE_IMAGES_FRAGMENT = gql`
  fragment VariantMetafieldLifestyleImages on ProductVariant {
    variantLifestyleImage1: metafield(
      namespace: "debut"
      key: "variant_lifestyle_image_1"
    ) {
      reference {
        ...Media
      }
    }
    variantLifestyleImage2: metafield(
      namespace: "debut"
      key: "variant_lifestyle_image_2"
    ) {
      reference {
        ...Media
      }
    }
    variantLifestyleImage3: metafield(
      namespace: "debut"
      key: "variant_lifestyle_image_3"
    ) {
      reference {
        ...Media
      }
    }
    variantLifestyleImage4: metafield(
      namespace: "debut"
      key: "variant_lifestyle_image_4"
    ) {
      reference {
        ...Media
      }
    }
  }
`;

export const VARIANT_METAFIELD_COLOR_IMAGES_FRAGMENT = gql`
  fragment VariantMetafieldColorImages on ProductVariant {
    variantColorImage: metafield(
      namespace: "debut"
      key: "variant_color_image"
    ) {
      reference {
        ...Media
      }
    }
  }
`;

export const PRODUCT_APPAREL_FRAGMENT = gql`
  fragment ProductApparel on Product {
    apparelFit: metafield(namespace: "debut", key: "apparel_fit") {
      value
    }
    apparelMaterial: metafield(namespace: "debut", key: "apparel_material") {
      value
    }
    apparelColor: metafield(namespace: "debut", key: "apparel_color") {
      value
    }
    apparelLogoFront: metafield(namespace: "debut", key: "apparel_logo_front") {
      value
    }
    apparelLogoBack: metafield(namespace: "debut", key: "apparel_logo_back") {
      value
    }
    sizeChart: metafield(namespace: "debut", key: "product_size_chart_type") {
      value
    }
    oldSizeChart: metafield(namespace: "suave", key: "productSizeChartType") {
      value
    }
  }
`;

export const PRODUCT_SECTION_HOW_IT_LOOKS_FRAGMENT = gql`
  fragment ProductSectionHowItLooks on Product {
    howItLooksImage1: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_1"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage2: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_2"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage3: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_3"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage4: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_4"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage5: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_5"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage6: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_6"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage7: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_7"
    ) {
      reference {
        ...Media
      }
    }
    howItLooksImage8: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_8"
    ) {
      reference {
        ...Media
      }
    }
  }
`;

export const PRODUCT_SECTION_GET_INSPIRED_FRAGMENT = gql`
  fragment ProductSectionGetInspired on Product {
    getInspiredImage1: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_1"
    ) {
      reference {
        ...Media
      }
    }
    getInspiredImage2: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_2"
    ) {
      reference {
        ...Media
      }
    }
    getInspiredImage3: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_3"
    ) {
      reference {
        ...Media
      }
    }
    getInspiredImage4: metafield(
      namespace: "debut"
      key: "default_lifestyle_image_4"
    ) {
      reference {
        ...Media
      }
    }
  }
`;
