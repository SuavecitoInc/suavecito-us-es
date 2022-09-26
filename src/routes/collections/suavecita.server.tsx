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
  ResponsiveBanner,
  FeaturedRowImageWithText,
  Divider,
  FeaturedRowColumns,
} from '~/components';
import {Layout, BestSellers} from '~/components/index.server';

// hard coded data
import {
  responsiveBannerSettings,
  featuredRowImageOneSettings,
  featuredRowColumnsOneSettings,
} from '../../data/suavecita-page-es';
import {BrandTheme} from '~/types/suavecito';

export default function Suavecita({theme = 'suavecita'}: {theme: BrandTheme}) {
  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.home,
    },
  });

  return (
    <Layout theme={theme} showTopPadding={false}>
      <Suspense>
        <SeoForHomepage />
      </Suspense>
      <Suspense>
        <HomepageContent theme={theme} />
      </Suspense>
    </Layout>
  );
}

function HomepageContent({theme}: {theme: BrandTheme}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  return (
    <>
      <ResponsiveBanner {...responsiveBannerSettings} />
      <FeaturedRowImageWithText {...featuredRowImageOneSettings} />
      <FeaturedRowColumns {...featuredRowColumnsOneSettings} />
      <Divider width="half" />
      <BestSellers lang={LANG} theme={theme} />
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
