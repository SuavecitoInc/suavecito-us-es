const bannerWidth = 1023;
const bannerHeight = 1279;

interface Metafield {
  value: string;
  reference?: {
    mediaContentType: string;
    alt: string;
    previewImage: {
      url: string;
    };
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export const AdBanners: {
  [key: string]: {
    images: {
      banner: Metafield;
      url?: Metafield;
      label?: Metafield;
    }[];
  };
} = {
  'water-based-pomades': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Compra 2 recibe 1 gratis',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_mens_hair_spanish.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_mens_hair_spanish.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/pomades',
        },
      },
    ],
  },
  'matte-pomades': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Pomadas 32oz $15 de descuento',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFAD_tubs_spanish.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFAD_tubs_spanish.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
      },
    ],
  },
  'oil-based-pomades': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Pomada a base de aceite. Una pomada tradicional a base petrelio que proporciona durabilidad y fijacion durante el dia brillo alte ideal para peinados clasicos.',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/oil_based_sp-es.jpg?v=1660935315',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/oil_based_sp-es.jpg?v=1660935315',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/oil-based-pomade',
        },
      },
    ],
  },
  'mens-styling': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Nuevo! Polvo texturizador. Proporciona volumen y textura, fijacion fuerte, acabado mate.',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/texturizing_sp-es.jpg?v=1660935315',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/texturizing_sp-es.jpg?v=1660935315',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/texturizing-powder',
        },
      },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Gel para cabello firme. No contiene alcohol, no produce resequedad (caspa). Fijacion fuerte, brillo alto, aroma tradicional',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/styling_gel_sp-es.jpg?v=1660935315',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/styling_gel_sp-es.jpg?v=1660935315',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/firme-hold-styling-gel',
        },
      },
    ],
  },
  'beard-mustache': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Compra dos recibe uno gratis!',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_beard_spanish.jpg?v=1669167802',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_beard_spanish.jpg?v=1669167802',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/premium-blends-beard-oil',
        },
      },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Shampoo y acondcionador para barba. Limpia e hidrata suavemente, ayuda a desenerdar y suavizar la barba rizada, hace la barba mas manejable',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/beard_wash_conditioner_sp-es.jpg?v=1660935005',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/beard_wash_conditioner_sp-es.jpg?v=1660935005',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/beard-wash-conditioner',
        },
      },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Crema para barba, Disponible en aroma original o whisby bar. Excelente para combinar con otros productas para barba',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/beard_butter_sp-es.jpg?v=1660935005',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/beard_butter_sp-es.jpg?v=1660935005',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/beard-butter',
        },
      },
    ],
  },
  shave: {
    images: [
      // {
      //   banner: {
      //     value: '',
      //     reference: {
      //       mediaContentType: 'IMAGE',
      //       alt: 'Compre dos recibe uno gratis',
      //       previewImage: {
      //         url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFAD_SHAVE_spanish.jpg?v=1669164455',
      //       },
      //       image: {
      //         url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFAD_SHAVE_spanish.jpg?v=1669164455',
      //         width: bannerHeight,
      //         height: bannerWidth,
      //       },
      //     },
      //   },
      //   url: {
      //     value: '/products/beard-wash-conditioner',
      //   },
      // },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Subscription Box Ad',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bay_rum_sp-es.jpg?v=1660935005',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bay_rum_sp-es.jpg?v=1660935005',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/beard-wash-conditioner',
        },
      },
    ],
  },
  'body-care': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Compra dos recibe uno gratis!',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_body_spanish-1.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_body_spanish-1.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/body-care',
        },
      },
    ],
  },
  combs: {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: '30% de descuento',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_combs_8fd73912-8614-4dde-bdd1-962c46aeed06.jpg?v=1669168915',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_combs_8fd73912-8614-4dde-bdd1-962c46aeed06.jpg?v=1669168915',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/combs',
        },
      },
    ],
  },
  'mens-shirts': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: '20% de descuento',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_cito_apparel_6dd8b9e1-3088-4c22-9f94-08bf2d2f8830.jpg?v=1668733763',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_cito_apparel_6dd8b9e1-3088-4c22-9f94-08bf2d2f8830.jpg?v=1668733763',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/mens-shirts',
        },
      },
    ],
  },
  'womens-styling': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Compra dos recibe uno gratis!',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_suavecita_hair_spanish.jpg?v=1669169295',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_suavecita_hair_spanish.jpg?v=1669169295',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/womens-styling',
        },
      },
    ],
  },
  lips: {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Compra dos recibe uno gratis!',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFD_COSMETICS_spanish.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/BFD_COSMETICS_spanish.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/lips',
        },
      },
    ],
  },
  'womens-shirts': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: '20% de descuento',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_cita_apparel_spanish.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_cita_apparel_spanish.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/womens-shirts',
        },
      },
    ],
  },
  'suavecito-collectibles': {
    images: [
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: '30% de descuento',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_merch_spanish.jpg?v=1669164456',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/bfad_merch_spanish.jpg?v=1669164456',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/collectibles',
        },
      },
    ],
  },
};
