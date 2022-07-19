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

import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {
  FeaturedCollections,
  Hero,
  Banner,
  ResponsiveBanner,
  FeaturedRowImageWithText,
  Divider,
  FeaturedRowColumns,
  FeaturedVideo,
} from '~/components';
import {Layout, ProductSwimlane, BestSellers} from '~/components/index.server';
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

  const {heroBanners, featuredCollections, featuredProducts} = data;

  // fill in the hero banners with placeholders if they're missing
  const [primaryHero, secondaryHero, tertiaryHero] = getHeroPlaceholder(
    heroBanners.nodes,
  );

  return (
    <>
      {/* {primaryHero && (
        <Hero {...primaryHero} height="full" top loading="eager" />
      )} */}

      {/* <ProductSwimlane
        data={featuredProducts.nodes}
        title="Featured Products"
        divider="bottom"
      />
      {secondaryHero && <Hero {...secondaryHero} />}
      <FeaturedCollections
        data={featuredCollections.nodes}
        title="Collections"
      />
      {tertiaryHero && <Hero {...tertiaryHero} />} */}

      <ResponsiveBanner {...responsiveBannerSettings} />
      <FeaturedRowImageWithText {...featuredRowImageOneSettings} />
      <Divider width="half" />
      <BestSellers />
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
  ${MEDIA_FRAGMENT}
  ${PRODUCT_CARD_FRAGMENT}
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
        heading: metafield(namespace: "hero", key: "title") {
          value
        }
        byline: metafield(namespace: "hero", key: "byline") {
          value
        }
        cta: metafield(namespace: "hero", key: "cta") {
          value
        }
        spread: metafield(namespace: "hero", key: "spread") {
          reference {
            ...Media
          }
        }
        spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
          reference {
            ...Media
          }
        }
      }
    }
    featuredCollections: collections(
      first: 3
      query: "collection_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
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
