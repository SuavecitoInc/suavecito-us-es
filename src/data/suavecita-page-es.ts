import {
  ResponsiveBannerSectionData,
  FeaturedRowImageSectionData,
  BannerSectionData,
  FeaturedRowColumnsSectionData,
  FeaturedVideoSectionData,
} from '../types/home-page';

export const responsiveBannerSettings: ResponsiveBannerSectionData = {
  heading: {value: 'Powered by Hydrogen'},
  byline: {
    value: 'The All New Hydrogen Snowboard Exclusively From Shopify',
  },
  cta: {value: 'Shop Now →'},
  handle: 'freestyle',
  spread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_large_sp_50e89761-9ff0-45bb-a311-48c122c80cd1.jpg?v=1663350498',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_large_sp_50e89761-9ff0-45bb-a311-48c122c80cd1.jpg?v=1663350498',
        width: 2048,
        height: 930,
      },
    },
  },
  largeSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_large_sp_50e89761-9ff0-45bb-a311-48c122c80cd1.jpg?v=1663350498',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_large_sp_50e89761-9ff0-45bb-a311-48c122c80cd1.jpg?v=1663350498',
        width: 2048,
        height: 930,
      },
    },
  },
  mediumSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_medium_sp_5adfd0c1-9a9c-41d6-a121-24f76fc6c22c.jpg?v=1663350498',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_medium_sp_5adfd0c1-9a9c-41d6-a121-24f76fc6c22c.jpg?v=1663350498',
        width: 2048,
        height: 1764,
      },
    },
  },
  smallSpread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
      previewImage: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_small_sp_5ea501a8-2a6f-4d8a-a92b-8706df9d702b.jpg?v=1663350498',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/cita_september_landing_banner_small_sp_5ea501a8-2a6f-4d8a-a92b-8706df9d702b.jpg?v=1663350498',
        width: 2048,
        height: 2048,
      },
    },
  },
  top: false,
  loading: 'eager',
  displayHeading: false,
};

export const featuredRowImageOneSettings: FeaturedRowImageSectionData = {
  theme: 'suavecita',
  heading: {value: 'Productos para Cabello'},
  subText: {
    value:
      'La gama de productos capilares de Suavecita puede llevarte desde el lavado de tu cabello, hasta la coloración y los toques finales de un peinado. Todos los productos son de calidad de salón y huelen increíblemente bien, sin mencionar que son veganos y libres de crueldad.',
  },
  cta: {value: 'Compra Cabello'},
  ctaLink: '/collections/womens-hair',
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
  ctaLink:
    '/blogs/grooming-tips/pomade-hair-wax-clay-gel-paste-which-is-right-for-me',
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

export const featuredRowColumnsOneSettings: FeaturedRowColumnsSectionData = {
  one: {
    theme: 'suavecita',
    heading: {value: 'Cosméticos'},
    subText: {
      value:
        'Desde el lápiz de labios hasta las pestañas, Suavecita tiene cubiertas tus necesidades cosméticas. Nuestros productos son veganos y libres de crueldad, de alta calidad y asequibles.',
    },
    cta: {value: 'Compra Cosméticos'},
    ctaLink: '/collections/cosmetics',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Cosméticos',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecita-featured-image-2.jpg?v=16327861092',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecita-featured-image-2.jpg?v=1632786109',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  two: {
    theme: 'suavecita',
    heading: {value: 'Ropa'},
    subText: {
      value:
        'Demuestra tu amor por Suavecita con nuestra ropa de primera calidad. Camisetas, pantalones cortos, sudaderas y mucho más.',
    },
    cta: {value: 'Compra Ropa'},
    ctaLink: '/collections/womens-apparel',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Ropa',
        previewImage: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecita-featured-image-3.jpg?v=1632786109',
        },
        image: {
          url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/suavecita-featured-image-3.jpg?v=1632786109',
          width: 720,
          height: 720,
        },
      },
    },
    loading: 'eager',
  },
  three: {
    theme: 'suavecita',
    heading: {value: 'Coleccionables'},
    subText: {
      value:
        'Todos estos artículos coleccionables son muy divertidos de exhibir o usar. Desde tazas, hasta pins, pasando por peluches, hay algo para todos.',
    },
    cta: {value: 'Compra Coleccionables'},
    ctaLink: '/collections/collectibles',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'Coleccionables',
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
