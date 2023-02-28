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
  FeaturedRowImageWithText,
  FeaturedRowColumns,
  CollectionImageCarousel,
} from '~/components';
import {Layout, BestSellers, ThreeImageBanner} from '~/components/index.server';

// hard coded data
import {
  collectionsSlideData,
  threeImageBannerSettings,
  featuredRowImageOneSettings,
  featuredRowColumnsOneSettings,
} from '../../data/suavecita-page';

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
      <CollectionImageCarousel
        slideData={collectionsSlideData}
        marginTop={true}
        marginBottom={true}
      />

      <ThreeImageBanner {...threeImageBannerSettings} />
      <BestSellers lang={LANG} theme={theme} />
      <FeaturedRowImageWithText {...featuredRowImageOneSettings} />
      <FeaturedRowColumns {...featuredRowColumnsOneSettings} />
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
