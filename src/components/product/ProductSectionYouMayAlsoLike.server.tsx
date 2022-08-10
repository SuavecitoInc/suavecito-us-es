import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {ProductGridItem, Section} from '~/components';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

const LANG = import.meta.env.LANGUAGE;

export function ProductSectionYouMayAlsoLike({
  lang = LANG,
  theme = 'suavecito',
  title = 'You May Also Like',
  productId = 'gid://shopify/Product/161353365',
  count = 4,
  ...props
}) {
  title = lang === 'ES' ? 'También te puede interesar' : 'You May Also Like';

  const recommendedProductMarkup = useMemo(() => {
    return (
      <Suspense>
        <Products
          count={count}
          productId={productId}
          theme={theme as BrandTheme}
        />
      </Suspense>
    );
  }, [count, productId, theme]);

  return (
    <Section padding="y" {...props}>
      <h3
        className={`max-w-md mb-[15px] uppercase font-bold mx-auto text-center text-2xl lg:text-3xl`}
      >
        {title}
      </h3>
      <div className="page-width grid grid-cols-2 gap-4 md:grid-cols-4">
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
  } = useShopQuery({
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
