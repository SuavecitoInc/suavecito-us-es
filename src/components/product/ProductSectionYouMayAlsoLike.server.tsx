import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {PRODUCT_FILTER_TAG} from '~/lib/const';
import {ProductGridItem, Section} from '~/components';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

// uses product recommendations when products are not filtered
// and uses filtered products when they are

export function ProductSectionYouMayAlsoLike({
  lang = 'en',
  theme = 'suavecito',
  title = 'You May Also Like',
  productId = 'gid://shopify/Product/161353365',
  count = 4,
  ...props
}) {
  title = lang === 'es' ? 'También te puede interesar' : 'You May Also Like';

  const recommendedProductMarkup = useMemo(() => {
    return (
      <Suspense>
        {lang === 'es' ? (
          <ProductsRandom count={count} theme={theme as BrandTheme} />
        ) : (
          <Products
            count={count}
            productId={productId}
            theme={theme as BrandTheme}
          />
        )}
      </Suspense>
    );
  }, [count, productId, theme, lang]);

  return (
    <Section padding="y" {...props}>
      <h3
        className={`max-w-md mb-[15px] uppercase font-bold mx-auto text-center text-2xl lg:text-3xl`}
      >
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-4 page-width md:grid-cols-4">
        {recommendedProductMarkup}
      </div>
    </Section>
  );
}

function ProductGrid({
  theme,
  products,
}: {
  theme: BrandTheme;
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <ProductGridItem
          theme={theme}
          product={product}
          key={product.id}
          className=""
        />
      ))}
    </>
  );
}

function Products({
  theme,
  count,
  productId,
}: {
  theme: BrandTheme;
  count: number;
  productId: string;
}) {
  const {
    data: {productRecommendations},
  }: any = useShopQuery({
    query: YOU_MAY_ALSO_LIKE_QUERY,
    variables: {
      productId,
    },
    cache: CacheLong(),
    preload: true,
  });

  const getMultipleRandom = (arr: any[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  };

  return (
    <ProductGrid
      theme={theme}
      products={getMultipleRandom(productRecommendations, count)}
    />
  );
}

const YOU_MAY_ALSO_LIKE_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $countryCode: CountryCode
    $languageCode: LanguageCode
  ) @inContext(country: $countryCode, language: $languageCode) {
    productRecommendations(productId: $productId) {
      ...ProductCard
    }
  }
`;

function ProductsRandom({theme, count}: {theme: BrandTheme; count: number}) {
  // if product filter tag set this will filter the collection by tag
  const PRODUCT_FILTER_QUERY: false | string = PRODUCT_FILTER_TAG
    ? `tag:${PRODUCT_FILTER_TAG}`
    : '';

  const {
    data: {products},
  }: any = useShopQuery({
    query: ALL_PRODUCTS_QUERY,
    variables: {
      tagFilter: PRODUCT_FILTER_QUERY,
    },
    cache: CacheLong(),
    preload: true,
  });

  const getMultipleRandom = (arr: any[], num: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, num);
  };

  return (
    <ProductGrid
      theme={theme}
      products={getMultipleRandom(products.nodes, count)}
    />
  );
}

const ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query AllProducts(
    $country: CountryCode
    $language: LanguageCode
    $tagFilter: String
  ) @inContext(country: $country, language: $language) {
    products(first: 50, query: $tagFilter) {
      nodes {
        ...ProductCard
      }
    }
  }
`;
