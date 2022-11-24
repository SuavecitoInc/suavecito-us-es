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
            alt: 'Suavecito X Loser Machine Pomade Collecion. Edicion Limitada. Pomade Mate, Pomada Original, Pomada Firme, Fragancia Exclusivo, Dia de Triturar',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/verticalbanner_suavecitoxloser_sp-es.jpg?v=1660935315',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/verticalbanner_suavecitoxloser_sp-es.jpg?v=1660935315',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/suavecito-x-loser-machine',
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
            alt: 'Suavecito X Universal Studios Monsters. Almizcle de Luna. Las altas notas de lima citrica y crujiente manzana verde lo haran recordad la noche. Lost rastros de jazmin floral y rosa te acercan cada vez mas. Las notas a base de pachuli y vetiver embriaga tus sentidos y te llevan a la compana de los Monstruos (justo donde te quieren). Pomada original, pomada firme, pomada mate.',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/monsters_pomade_vertical_banner_sp-es.jpg?v=1660935315',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/monsters_pomade_vertical_banner_sp-es.jpg?v=1660935315',
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
};
