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
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-large.jpg?v=1657834726',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-large.jpg?v=1657834726',
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
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-large.jpg?v=1657834726',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-large.jpg?v=1657834726',
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
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-medium.jpg?v=1657834726',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-medium.jpg?v=1657834726',
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
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-medium.jpg?v=1657834726',
      },
      image: {
        url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/responsive-banner-ex-medium.jpg?v=1657834726',
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
  heading: {value: 'Hair Products'},
  subText: {
    value:
      "Suavecito hair products are unlike any other. While our incomparable water based pomades are what we're known for, we've expanded into a line of hair care and styling products that can help you achieve the hairstyle you've always wanted.",
  },
  cta: {value: 'Shop Hair'},
  ctaLink: '/collections/mens-hair',
  featuredImage: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
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
  heading: {value: 'Combs, Brushes & Shaving Accessories'},
  subText: {
    value:
      "With a variety of comb shapes and sizes, and brushes for your hair or beard, you'll find exactly what you need in our comb & brush offerings.",
  },
  cta: {value: 'Shop Combs & More'},
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
  heading: {value: 'Pomade, Hair Wax, Clay, Gel, Paste?'},
  subText: {
    value:
      'Which is right for me? Find out which products will work for your hair and the style you want to achieve.',
  },
  cta: {value: 'Learn More'},
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

export const bannerTwoSettings: BannerSectionData = {
  heading: {value: 'Hair Loss Treatment'},
  byline: {
    value:
      'Suavecito has created this line of products specially made for the treatment and prevention of hair loss in men.',
  },
  cta: {value: 'Shop Now'},
  ctaLink: '/collections/grow-it',
  spread: {
    value: '',
    reference: {
      mediaContentType: 'IMAGE',
      alt: 'This is my alt',
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
    heading: {value: 'Shave'},
    subText: {
      value:
        'Bring enjoyment back into your shaving routine with our line of high quality shave products and accessories.',
    },
    cta: {value: 'Shop Shave'},
    ctaLink: '/collections/combs-brushes-shaving-accessories',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
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
    heading: {value: 'Beard & Mustache'},
    subText: {
      value:
        'Our amazing line of beard & mustache products are made with nourishing ingredients to keep your facial hair happy and healthy.',
    },
    cta: {value: 'Shop Beard'},
    ctaLink: '/collections/combs-brushes-shaving-accessories',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
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
    heading: {value: 'Body'},
    subText: {
      value:
        'Suavecito has you covered from head to toe - and we really mean that. Our line of body care products will keep you looking great and smelling fresh.',
    },
    cta: {value: 'Shop Body'},
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
    heading: {value: 'Collaborations'},
    subText: {
      value:
        "For any true Suavecito collector, check out the limited edition collaborations we've done. Make sure you get them while you can!",
    },
    cta: {value: 'Shop Collabs'},
    ctaLink: '/collections/collaborations',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
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
    heading: {value: 'Apparel'},
    subText: {
      value:
        'Show your love for Suavecito with our wide array of apparel, Tees, polos, sweatshirts and more!',
    },
    cta: {value: 'Shop Apparel'},
    ctaLink: '/collections/apparel',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
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
    heading: {value: 'Collectibles'},
    subText: {
      value:
        'All of these collectible items are super fun to display or use. From mugs to pins to plush toys, there is something for everyone!',
    },
    cta: {value: 'Shop Collectibles'},
    ctaLink: '/collections/collectibles',
    featuredImage: {
      value: '',
      reference: {
        mediaContentType: 'IMAGE',
        alt: 'This is my alt',
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
      alt: '',
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
    value: 'hFLTrGcAx9c',
  },
};
