import {Suspense} from 'react';
import {
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {NotFound, Layout} from '~/components/index.server';
import {FeaturedProductRow} from '../collection/FeaturedProductRow.server';
import {HeroBanner} from '../collection/HeroBanner.server';
import {BrandTheme} from '~/types/suavecito';

const pageBy = 48;
const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

export function CollectionFeaturedImages({
  handle,
  query,
  theme = 'suavecito',
  lang = LANG,
}: {
  handle: string;
  query: string;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
  const {
    language: {isoCode: language},
    country: {isoCode: country},
  } = useLocalization();

  const COLLECTION_QUERY = query;

  const {data}: {data: any} = useShopQuery({
    query: COLLECTION_QUERY,
    variables: {
      handle,
      language,
      country,
      pageBy,
    },
    preload: true,
  });
  if (!data.collection) {
    return <NotFound type="collection" />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: data.collection.id,
    },
  });
  return (
    <Layout theme={theme} showTopPadding={false}>
      <Suspense>
        <Seo type="collection" data={data.collection} />
      </Suspense>
      <section>
        <HeroBanner collection={data.collection} />
      </section>
      {Array.from(Array(6)).map(
        (x, i) =>
          data[`collectionSection${i + 1}`] && (
            <div key={data[`collectionSection${i + 1}`].id}>
              <FeaturedProductRow
                lang={lang}
                theme={theme}
                collection={data[`collectionSection${i + 1}`]}
                url={`/collections/${
                  data[`collectionSection${i + 1}`].handle
                }?country=${country}`}
                position={(i + 1) % 2 !== 0 ? 'left' : 'right'}
              />
            </div>
          ),
      )}
    </Layout>
  );
}
