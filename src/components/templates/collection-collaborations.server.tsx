import {Suspense} from 'react';
import {
  Seo,
  ShopifyAnalyticsConstants,
  useServerAnalytics,
  useLocalization,
  useShopQuery,
} from '@shopify/hydrogen';

import {NotFound, Layout, FeaturedVariantRow} from '~/components/index.server';
import {HeroBanner} from '../collection/HeroBanner.server';
import {BrandTheme} from '~/types/suavecito';

const pageBy = 48;

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

export function CollectionCollaborations({
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
  const collabs = {
    description: {
      en: 'Suavecito has had the opportunity to collaborate with a wide range of properties, from local artists to classic Universal Monsters. Here you’ll find our most recent licensed products which include pomades, accessories, cosmetics and more!',
      es: 'Suavecito ha tenido la oportunidad de colaborar con una amplia gama de propiedades. Aquí encontrarás nuestros productos con licencia más recientes que incluyen pomadas, accesorios, cosméticos y mucho más.',
    },
  };

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
        <div className="page-width">
          <p className="text-center py-[55px] font-bold">
            {collabs.description[lang]}
          </p>
        </div>
      </section>

      {Array.from(Array(10)).map(
        (x, i) =>
          data[`collectionSection${i + 1}`] && (
            <div key={data[`collectionSection${i + 1}`].id}>
              <FeaturedVariantRow
                theme={theme}
                collection={data[`collectionSection${i + 1}`]}
                url={`/collections/${
                  data[`collectionSection${i + 1}`].handle
                }?country=${country}`}
                lang={lang}
              />
            </div>
          ),
      )}
    </Layout>
  );
}
