import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, useLocalization} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductGridItem, Section, Heading} from '~/components';
import type {
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

export function BestSellers({title = 'Best Sellers', count = 4, ...props}) {
  return (
    <Section padding="y" {...props}>
      <Heading
        format
        as="h3"
        size="heading"
        className="uppercase mx-auto text-center"
      >
        {title}
      </Heading>
      <div className="page-width grid grid-cols-2 gap-4 md:grid-cols-4">
        <BestSellerProducts count={count} />
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
