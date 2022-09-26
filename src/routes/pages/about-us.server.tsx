import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Heading} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

export default function Page({params}: HydrogenRouteProps) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const {handle} = params;
  const {
    data: {page, spanishPage},
  } = useShopQuery({
    query: PAGE_QUERY,
    variables: {languageCode, handle},
  });

  if (!page) {
    return <NotFound />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: page.id,
    },
  });
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;
  const selectedPage = LANG === 'es' ? spanishPage : page;
  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={selectedPage} />
      </Suspense>
      <section className="page-width">
        <div className="page-width">
          <Heading
            as="h1"
            width="narrow"
            size="heading"
            className="pb-[25px] text-center"
          >
            {selectedPage.title}
          </Heading>
        </div>

        <div
          dangerouslySetInnerHTML={{__html: selectedPage.body}}
          className="prose page-width text-black"
        />
      </section>
    </Layout>
  );
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode)
  @inContext(language: $languageCode) {
    page(handle: "about-us") {
      id
      title
      body
      seo {
        description
        title
      }
    }
    spanishPage: page(handle: "sobre-nosotros") {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
