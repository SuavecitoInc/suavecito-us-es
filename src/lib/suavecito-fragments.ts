import {gql} from '@shopify/hydrogen';

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

const PRODUCT_SECTION_LANG_FRAGMENT =
  LANG === 'es'
    ? gql`
        fragment ProductSectionLang on Product {
          productSectionDescription: metafield(
            namespace: "debut"
            key: "section_product_description_es"
          ) {
            value
          }
          productSectionListItemText1: metafield(
            namespace: "debut"
            key: "section_list_item_1_text_es"
          ) {
            value
          }
          productSectionListItemText2: metafield(
            namespace: "debut"
            key: "section_list_item_2_text_es"
          ) {
            value
          }
          productSectionListItemText3: metafield(
            namespace: "debut"
            key: "section_list_item_3_text_es"
          ) {
            value
          }
          productSectionListItemText4: metafield(
            namespace: "debut"
            key: "section_list_item_4_text_es"
          ) {
            value
          }
          productSectionHowToImage: metafield(
            namespace: "debut"
            key: "section_how_to_image_es"
          ) {
            reference {
              ...Media
            }
          }
          productSectionHowToText: metafield(
            namespace: "debut"
            key: "section_how_to_es"
          ) {
            value
          }
          productSectionHowToEmbeddedVideo: metafield(
            namespace: "debut"
            key: "video_embed_es"
          ) {
            value
          }
        }
      `
    : gql`
        fragment ProductSectionLang on Product {
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

export const PRODUCT_SECTION_FRAGMENT = gql`
  ${PRODUCT_SECTION_LANG_FRAGMENT}
  fragment ProductSection on Product {
    ...ProductSectionLang
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

export const VARIANT_FRAGRANCE_FRAGMENT =
  LANG === 'es'
    ? gql`
        fragment VariantFragrance on ProductVariant {
          variantFragranceProfile: metafield(
            namespace: "debut"
            key: "variant_fragrance_profile_es"
          ) {
            value
          }
        }
      `
    : gql`
        fragment VariantFragrance on ProductVariant {
          variantFragranceProfile: metafield(
            namespace: "debut"
            key: "variant_fragrance_profile"
          ) {
            value
          }
        }
      `;

export const VARIANT_SALE_FRAGMENT = gql`
  fragment VariantSale on ProductVariant {
    isB2G1F: metafield(namespace: "debut", key: "is_b2g1f") {
      value
    }
    isBOGO: metafield(namespace: "debut", key: "is_bogo") {
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
    variantExcluded: metafield(
      namespace: "debut"
      key: "exclude_variant_online"
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

export const PRODUCT_SECTION_HOW_TO_FRAGMENT = gql`
  fragment ProductSectionHowTo on Product {
    howToUse1: metafield(namespace: "debut", key: "default_lifestyle_image_1") {
      reference {
        ...Media
      }
    }
    howToUse2: metafield(namespace: "debut", key: "default_lifestyle_image_2") {
      reference {
        ...Media
      }
    }
    howToUse3: metafield(namespace: "debut", key: "default_lifestyle_image_3") {
      reference {
        ...Media
      }
    }
  }
`;

export const PRODUCT_SECTION_KIT_INCLUDES = gql`
  fragment ProductSectionKitIncludes on Product {
    kitProduct1: metafield(namespace: "debut", key: "kit_product_1") {
      value
    }
    kitProduct2: metafield(namespace: "debut", key: "kit_product_2") {
      value
    }
    kitProduct3: metafield(namespace: "debut", key: "kit_product_3") {
      value
    }
    kitProduct4: metafield(namespace: "debut", key: "kit_product_4") {
      value
    }
    kitProduct5: metafield(namespace: "debut", key: "kit_product_5") {
      value
    }
    kitProduct6: metafield(namespace: "debut", key: "kit_product_6") {
      value
    }
    kitProductVariant1: metafield(
      namespace: "debut"
      key: "kit_product_variant_1"
    ) {
      value
    }
    kitProductVariant2: metafield(
      namespace: "debut"
      key: "kit_product_variant_2"
    ) {
      value
    }
    kitProductVariant3: metafield(
      namespace: "debut"
      key: "kit_product_variant_3"
    ) {
      value
    }
    kitProductVariant4: metafield(
      namespace: "debut"
      key: "kit_product_variant_4"
    ) {
      value
    }
    kitProductVariant5: metafield(
      namespace: "debut"
      key: "kit_product_variant_5"
    ) {
      value
    }
    kitProductVariant6: metafield(
      namespace: "debut"
      key: "kit_product_variant_6"
    ) {
      value
    }
    kitProductVariant7: metafield(
      namespace: "debut"
      key: "kit_product_variant_7"
    ) {
      value
    }
    kitProductVariant8: metafield(
      namespace: "debut"
      key: "kit_product_variant_8"
    ) {
      value
    }
    kitProductVariant9: metafield(
      namespace: "debut"
      key: "kit_product_variant_9"
    ) {
      value
    }
    kitProductVariant10: metafield(
      namespace: "debut"
      key: "kit_product_variant_10"
    ) {
      value
    }
  }
`;

export const FREE_GIFT_PRODUCT_CARD_FRAGMENT = gql`
  fragment FreeGiftProductCard on Product {
    id
    title
    publishedAt
    handle
    availableForSale
    variants(first: 1) {
      nodes {
        id
        availableForSale
        quantityAvailable
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`;

export const COLLECTION_PRODUCT_FRAGMENT = gql`
  fragment CollectionProduct on Product {
    id
    title
    publishedAt
    handle
    tags
    variants(first: 100) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        variantColorImage: metafield(
          namespace: "debut"
          key: "variant_color_image"
        ) {
          reference {
            ...Media
          }
        }
      }
    }
  }
`;

export const FILTERED_COLLECTION_FRAGMENT =
  LANG === 'es'
    ? gql`
        fragment FilteredCollectionWithMetafield on Collection {
          id
          handle
          title
          description
          seo {
            description
            title
          }
          headingName: metafield(
            namespace: "suave"
            key: "sub_collection_header_es"
          ) {
            value
          }
          products(
            first: 100
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
      `
    : gql`
        fragment FilteredCollectionWithMetafield on Collection {
          id
          handle
          title
          description
          seo {
            description
            title
          }
          headingName: metafield(
            namespace: "suave"
            key: "sub_collection_header_en"
          ) {
            value
          }
          products(
            first: 100
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
      `;

export const COLLECTION_PRODUCT_VARIANT_IMAGE_FRAGMENT = gql`
  fragment CollectionProductWithVariantImage on Product {
    id
    title
    publishedAt
    handle
    tags
    variants(first: 100) {
      nodes {
        id
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
        variantImage1: metafield(namespace: "debut", key: "variant_image_1") {
          reference {
            ...Media
          }
        }
        variantTitle: metafield(namespace: "debut", key: "variant_title") {
          value
        }
      }
    }
  }
`;

export const FILTERED_COLLECTION_WITH_VARIANT_FRAGMENT =
  LANG === 'es'
    ? gql`
        fragment FilteredCollectionWithVariantImage on Collection {
          id
          handle
          title
          description
          seo {
            description
            title
          }
          headingName: metafield(
            namespace: "suave"
            key: "sub_collection_header_es"
          ) {
            value
          }
          products(
            first: 100
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
      `
    : gql`
        fragment FilteredCollectionWithVariantImage on Collection {
          id
          handle
          title
          description
          seo {
            description
            title
          }
          headingName: metafield(
            namespace: "suave"
            key: "sub_collection_header_en"
          ) {
            value
          }
          products(
            first: 100
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
      `;
