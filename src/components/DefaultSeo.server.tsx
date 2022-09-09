import {
  CacheLong,
  gql,
  Head,
  Seo,
  useShopQuery,
  useUrl,
} from '@shopify/hydrogen';

/**
 * A server component that fetches a `shop.name` and sets default values and templates for every page on a website
 */
export function DefaultSeo() {
  const {
    data: {
      shop: {name, description},
    },
  }: any = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: '*',
  });

  const {pathname} = useUrl();
  const canonicalBasePath = 'https://suavecito.com';
  const canonicalURL = `${canonicalBasePath}${pathname}`;

  return (
    <>
      {/* @ts-ignore TODO: Fix types */}
      <Seo
        type="defaultSeo"
        data={{
          title: name,
          description,
          titleTemplate: `%s · ${name}`,
        }}
      />
      <Head>
        <link rel="canonical" href={canonicalURL} />
        <meta name="robots" content="noindex, nofollow"></meta>
      </Head>
    </>
  );
}

const SHOP_QUERY = gql`
  query shopInfo {
    shop {
      name
      description
    }
  }
`;
