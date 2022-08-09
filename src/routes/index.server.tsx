import {Suspense, useContext} from 'react';
import {
  CacheLong,
  gql,
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
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
import {
  CollectionConnection,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

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

const LANG = Oxygen.env.LANGUAGE;

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
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  const {data} = useShopQuery<{
    heroBanners: CollectionConnection;
    featuredCollections: CollectionConnection;
    featuredProducts: ProductConnection;
  }>({
    query: HOMEPAGE_CONTENT_QUERY,
    variables: {
      language: languageCode,
      country: countryCode,
    },
    preload: true,
  });

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

const HOMEPAGE_CONTENT_QUERY = gql`
  query homepage($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    heroBanners: collections(
      first: 3
      query: "collection_type:custom"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        handle
        title
        descriptionHtml
      }
    }
  }
`;

const HOMEPAGE_SEO_QUERY = gql`
  query homeShopInfo {
    shop {
      title: name
      description
    }
  }
`;
