import {
  ResponsiveBannerSectionData,
  FeaturedRowImageSectionData,
  BannerSectionData,
  FeaturedRowColumnsSectionData,
  FeaturedVideoSectionData,
} from '../../types/home-page';

export const responsiveBannerSettings: ResponsiveBannerSectionData = {
  heading: {value: 'Suavecito'},
  byline: {
    value: 'Get it Hombre!',
  },
  cta: {value: 'Shop Now →'},
  handle: 'mens-hair',
  spread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Regalo Gratis con compra de $55. Dos Regalos Gratis con compra de $75. *Mientras duren las provisiones.',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_large_SP.jpg?v=1675278632',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_large_SP.jpg?v=1675278632',
        width: 2048,
        height: 930,
      },
    },
  },
  largeSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Regalo Gratis con compra de $55. Dos Regalos Gratis con compra de $75. *Mientras duren las provisiones.',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_large_SP.jpg?v=1675278632',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_large_SP.jpg?v=1675278632',
        width: 2048,
        height: 930,
      },
    },
  },
  mediumSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Regalo Gratis con compra de $55. Dos Regalos Gratis con compra de $75. *Mientras duren las provisiones.',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_medium_SP.jpg?v=1675278632',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_medium_SP.jpg?v=1675278632',
        width: 2048,
        height: 1764,
      },
    },
  },
  smallSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Regalo Gratis con compra de $55. Dos Regalos Gratis con compra de $75. *Mientras duren las provisiones.',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_medium_SP.jpg?v=1675278632',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/FGWP_feb_2023_landing_banner_medium_SP.jpg?v=1675278632',
        width: 2048,
        height: 1764,
      },
    },
  },
  top: false,
  loading: 'eager',
  displayHeading: false,
};

export const featuredRowImageOneSettings: FeaturedRowImageSectionData = {
  heading: {value: 'Productos para Cabello'},
  subText: {
    value:
      'Los productos de Suavecito Pomade no se comparan con ningún otro. Si bien, se nos conoce por nuestras inigualables pomadas solubles en agua, hemos ampliado nuestra línea de productos para el cuidado y peinado de cabello, con productos que ayudan a lograr un peinado que siempre ha deseado.',
  },
  cta: {value: 'Compra Cabello'},
  ctaLink: '/collections/mens-hair',
  featuredImage: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Pomadas',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-1_cb767b4d-4dc0-4aa0-aa6f-815c2dfd23e1.jpg',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-1_cb767b4d-4dc0-4aa0-aa6f-815c2dfd23e1.jpg',
        width: 782,
        height: 782,
      },
    },
  },
  loading: 'eager',
};

export const featuredRowImageTwoSettings: FeaturedRowImageSectionData = {
  heading: {value: 'Peines, Cepillos y Accesorios de Afeitado'},
  subText: {
    value:
      'Con una variedad de formas y tamaños de peines, y cepillos para el cabello o la barba, encontrará exactamente lo que necesita en nuestra oferta de peines y cepillos.',
  },
  cta: {value: 'Compra Peines'},
  ctaLink: '/collections/combs-brushes-shaving-accessories',
  featuredImage: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/combs-brushes-shaving.jpg?v=1634138668',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/combs-brushes-shaving.jpg?v=1634138668',
        width: 782,
        height: 782,
      },
    },
  },
  loading: 'eager',
};

export const featuredRowImageThreeSettings: FeaturedRowImageSectionData = {
  heading: {value: '¿Pomada, cera para el cabello, arcilla, gel, pasta?'},
  subText: {
    value:
      '¿Cuál es el correcto para mí? Descubra qué productos funcionarán para su cabello y el estilo que desea lograr.',
  },
  cta: {value: 'Aprende más'},
  ctaLink: '/pages/pomade-hair-wax-clay-gel-paste-which-is-right-for-me',
  featuredImage: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-8_1080x.jpg?v=1632939356',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-8_1080x.jpg?v=1632939356',
        width: 782,
        height: 782,
      },
    },
  },
  loading: 'eager',
};

export const bannerOneSettings: BannerSectionData = {
  heading: {value: ''},
  byline: {
    value: '',
  },
  cta: {value: 'Get Started!'},
  ctaLink: '/collections/mens-hair',
  spread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_banner_3b16d504-a6cf-4068-83c0-f0cd16a3d341_1950x.jpg?v=1648598529',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_banner_3b16d504-a6cf-4068-83c0-f0cd16a3d341_1950x.jpg?v=16485985296',
        width: 1950,
        height: 1097,
      },
    },
  },
  top: false,
  loading: 'eager',
  displayContent: true,
  contentAlignment: 'bottom-right',
  textColor: 'black',
  buttonColor: 'primary-inverted',
  overlayOpacityStart: 30,
  overlayOpacityEnd: 40,
  sectionHeight: 'small',
};

export const bannerTwoSettings: BannerSectionData = {
  heading: {value: 'Tratamiento Capilar - Anticaida'},
  byline: {
    value:
      'Suavecito ha creado una línea de productos diseñados especialmente para el tratamiento y la prevención de la caída de cabello en hombres.',
  },
  cta: {value: 'Compra Ahora'},
  ctaLink: '/collections/grow-it',
  spread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Tratamiento de Cabello-Anticaida',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/medicated_banner2_2100x.jpg',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/medicated_banner2_2100x.jpg',
        width: 2100,
        height: 1181,
      },
    },
  },
  top: false,
  loading: 'eager',
  displayContent: true,
  contentAlignment: 'top-right',
  textColor: 'white',
  buttonColor: 'primary-inverted',
  overlayOpacityStart: 60,
  overlayOpacityEnd: 90,
  sectionHeight: 'small',
};

export const featuredRowColumnsOneSettings: FeaturedRowColumnsSectionData = {
  one: {
    heading: {value: 'Afeitado'},
    subText: {
      value:
        '¡Vuelve a disfrutar de la rutina de afeitado con nuestra línea de productos y accesorios para un afeitado de calidad!',
    },
    cta: {value: 'Compra Afeitado'},
    ctaLink: '/collections/combs-brushes-shaving-accessories',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Afeitado',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-2_720x.jpg?v=1632939292',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-2_720x.jpg?v=1632939292',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  two: {
    heading: {value: 'Barba y Bigote'},
    subText: {
      value:
        'Nuestra increíble línea de productos para barba y bigote está hecha de ingredientes nutritivos para mantener un vello facial limpio y saludable. ',
    },
    cta: {value: 'Compra Barba y Bigote'},
    ctaLink: '/collections/combs-brushes-shaving-accessories',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Barba Y Bigote',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-3_720x.jpg?v=1632939309',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-3_720x.jpg?v=1632939309',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  three: {
    heading: {value: 'Cuerpo'},
    subText: {
      value:
        'Suavecito te cubre de pies a cabeza y lo decimos enserio. Nuestra línea de productos para el cuidado del cuerpo. Te dejarán lucir genial y con un fresco aroma.',
    },
    cta: {value: 'Compra Cuerpo'},
    ctaLink: '/collections/combs-brushes-shaving-accessories',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-4_720x.jpg?v=1632939320',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-4_720x.jpg?v=1632939320',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
};

export const featuredRowColumnsTwoSettings: FeaturedRowColumnsSectionData = {
  one: {
    heading: {value: 'Colaboraciones'},
    subText: {
      value:
        'Para cualquier verdadero coleccionista de Suavecito, echa un vistazo a las colaboraciones de edición limitada que hemos hecho. ¡Asegúrate de conseguirlas mientras puedas!',
    },
    cta: {value: 'Compra Colaboraciones'},
    ctaLink: '/collections/collaborations',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Colaboraciones',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-5_720x.jpg?v=1632844585',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-5_720x.jpg?v=1632844585',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  two: {
    heading: {value: 'Ropa'},
    subText: {
      value:
        '¡Demuestra tu amor por Suavecito con nuestra amplia variedad de ropa, playeras, sudaderas y mucho más!',
    },
    cta: {value: 'Compra Ropa'},
    ctaLink: '/collections/apparel',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Ropa',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-6_720x.jpg?v=1632844696',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-6_720x.jpg?v=1632844696',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  three: {
    heading: {value: 'Coleccionables'},
    subText: {
      value:
        'Todos estos coleccionables son super divertidos para usar o mostrar. Desde tazas, llaveros, muñecos de peluches, hay algo para todos.',
    },
    cta: {value: 'Compra Coleccionables'},
    ctaLink: '/collections/collectibles',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Coleccionables',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-7_720x.jpg?v=1632844657',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-page-featured-image-7_720x.jpg?v=1632844657',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
};

export const featuredVideoSettings: FeaturedVideoSectionData = {
  coverImage: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'Más Que Pomada y Productos de Peluquería de Alta Gama',
      previeImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/21_Suavecito_Anchor_16x9_v1_R6_ENG.00_00_14_11.Still003.jpg?v=1634907949',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/21_Suavecito_Anchor_16x9_v1_R6_ENG.00_00_14_11.Still003.jpg?v=1634907949',
        width: 1920,
        height: 1080,
      },
    },
  },
  youtubeVideoId: {
    value: 'ct39qnKZJRw',
  },
};
