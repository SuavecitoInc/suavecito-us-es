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
            alt: 'Suavecito X Loser Machine Pomade Colleciton',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/verticalbanner_suavecitoxloser.jpg?v=1659365442',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/verticalbanner_suavecitoxloser.jpg?v=1659365442',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/collections/suavecito-x-loser-machine',
        },
      },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Advertisement Banner',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/vertical_banner_fgwp-2.jpg?v=1659365351',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/vertical_banner_fgwp-2.jpg?v=1659365351',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        label: {value: 'FREE GIFT WITH PURCHASE'},
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
            alt: 'Subscription Box Ad',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
      },
      {
        banner: {
          value: '',
          reference: {
            mediaContentType: 'IMAGE',
            alt: 'Fast & Furious Matte Pomade',
            previewImage: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/fast_matte_text.jpg?v=1633460072',
            },
            image: {
              url: 'https://cdn.shopify.com/s/files/1/0274/1389/files/fast_matte_text.jpg?v=1633460072',
              width: bannerHeight,
              height: bannerWidth,
            },
          },
        },
        url: {
          value: '/products/matte-pomade?variant=39485015556179',
        },
      },
    ],
  },
};
