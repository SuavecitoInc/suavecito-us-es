import {Suspense, useMemo} from 'react';
import {
  gql,
  useShopQuery,
  useLocalization,
  CacheNone,
  CacheLong,
} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductGridItem, Section} from '~/components';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {homePageData} from '~/locale';

export function BestSellers({title = 'Best Sellers', count = 4, ...props}) {
  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();

  title = homePageData.bestSellers[languageCode];

  const bestSellersMarkup = useMemo(() => {
    return (
      <Suspense>
        <BestSellerProducts count={count} />
      </Suspense>
    );
  }, [count]);

  return (
    <Section padding="y" {...props}>
      <h3 className="max-w-md mb-[15px] uppercase font-bold mx-auto text-center text-2xl lg:text-3xl">
        {title}
      </h3>
      <div className="page-width grid grid-cols-2 gap-4 md:grid-cols-4">
        {bestSellersMarkup}
      </div>
    </Section>
  );
}

function ProductGrid({products}: {products: Product[]}) {
  return (
    <>
      {products.map((product) => (
        <ProductGridItem product={product} key={product.id} className="" />
      ))}
    </>
  );
}

function BestSellerProducts({count}: {count: number}) {
  const {
    data: {products},
  } = useShopQuery({
    query: BEST_SELLERS_QUERY,
    variables: {
      count,
    },
    cache: CacheLong(),
    preload: true,
  });

  return <ProductGrid products={products.nodes} />;
}

const BEST_SELLERS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query bestSellers(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
