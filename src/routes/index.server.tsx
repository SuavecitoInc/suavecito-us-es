import {Suspense} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useShopQuery,
} from '@shopify/hydrogen';
import {
  Banner,
  ResponsiveBanner,
  FeaturedRowImageWithText,
  Divider,
  FeaturedRowColumns,
  FeaturedVideo,
  CollectionImageCarousel,
} from '~/components';
import {Layout, BestSellers, ThreeImageBanner} from '~/components/index.server';

// hard coded data
import {
  threeImageBannerSettings,
  collectionsSlideData,
  featuredRowImageOneSettings,
  featuredRowImageTwoSettings,
  featuredRowImageThreeSettings,
  bannerTwoSettings,
  featuredRowColumnsOneSettings,
  featuredRowColumnsTwoSettings,
  featuredVideoSettings,
} from '../data/home-page';

export default function Homepage() {
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense>
        <HomepageContent />
      </Suspense>
    </Layout>
  );
}

function HomepageContent() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  return (
    <>
      <CollectionImageCarousel
        slideData={collectionsSlideData}
        marginTop={true}
        marginBottom={true}
      />
      <ThreeImageBanner {...threeImageBannerSettings} />
      <BestSellers lang={LANG} />
      <FeaturedRowImageWithText {...featuredRowImageOneSettings} />
      <Divider width="half" />
      <FeaturedRowColumns {...featuredRowColumnsOneSettings} />
      <FeaturedRowImageWithText {...featuredRowImageTwoSettings} />
      <Banner {...bannerTwoSettings} />
      <FeaturedRowColumns {...featuredRowColumnsTwoSettings} />
      <FeaturedVideo {...featuredVideoSettings} />
      <FeaturedRowImageWithText {...featuredRowImageThreeSettings} />
    </>
  );
}

function SeoForHomepage() {
  const {
    data: {
      shop: {title, description},
    },
  }: any = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const t: {[key: string]: string} = {
    en: 'Barber Approved &amp; Barbershop Preferred Products',
    es: 'Aprobado por peluqueros &amp; Productos preferidos de barbería',
  };

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
        titleTemplate: `%s: ${t[LANG]}`,
      }}
    />
  );
}

const HOMEPAGE_SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      title: name
      description
    }
  }
`;
