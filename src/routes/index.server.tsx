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
} from '~/components';
import {Layout, BestSellers} from '~/components/index.server';

// hard coded data
import {
  responsiveBannerSettings,
  featuredRowImageOneSettings,
  featuredRowImageTwoSettings,
  featuredRowImageThreeSettings,
  bannerOneSettings,
  bannerTwoSettings,
  featuredRowColumnsOneSettings,
  featuredRowColumnsTwoSettings,
  featuredVideoSettings,
} from '../data/home-page-es';

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
      <ResponsiveBanner {...responsiveBannerSettings} />
      <FeaturedRowImageWithText {...featuredRowImageOneSettings} />
      <Divider width="half" />
      <BestSellers lang={LANG} />
      <Banner {...bannerOneSettings} />
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
  } = useShopQuery({
    query: HOMEPAGE_SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <Seo
      type="homepage"
      data={{
        title,
        description,
        titleTemplate: '%s · Powered by Hydrogen',
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
