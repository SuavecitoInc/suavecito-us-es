import {Suspense, useMemo} from 'react';
import {gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
import {PRODUCT_CARD_FRAGMENT, MEDIA_FRAGMENT} from '~/lib/fragments';
import {COLLECTION_PRODUCT_FRAGMENT} from '~/lib/suavecito-fragments';
import {ProductGridItem, Section, ProductColorSwatches} from '~/components';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import {BrandTheme} from '~/types/suavecito';

const best_sellers: {[key: string]: any} = {
  title: {
    en: 'Best Sellers',
    es: 'Más Vendidos',
  },
};

export function BestSellers({
  lang = 'en',
  title = 'Best Sellers',
  count = 4,
  theme = 'suavecito',
  ...props
}: {
  theme?: BrandTheme;
  lang?: 'en' | 'es';
  title?: string;
  count?: number;
}) {
  title = best_sellers.title[lang];

  return (
    <Section padding="y" {...props}>
      <h3 className="max-w-md mb-[15px] uppercase font-bold mx-auto text-center text-2xl lg:text-3xl">
        {title}
      </h3>
      <div className="page-width grid grid-cols-2 gap-4 md:grid-cols-4">
        <BestSellerProducts count={count} theme={theme} />
      </div>
    </Section>
  );
}

function ProductGrid({
  products,
  theme = 'suavecito',
}: {
  products: Product[];
  theme?: BrandTheme;
}) {
  return (
    <>
      {products.map((product) => (
        <div key={product.id}>
          <ProductGridItem product={product} theme={theme} />
          {/* @ts-ignore */}
          {product.variants.nodes[0].variantColorImage && (
            <ProductColorSwatches product={product} />
          )}
        </div>
      ))}
    </>
  );
}

function BestSellerProducts({
  count,
  theme = 'suavecito',
}: {
  count: number;
  theme?: BrandTheme;
}) {
  const handle = theme === 'suavecita' ? 'best-sellers-cita' : 'best-sellers';
  const {data}: any = useShopQuery({
    query: BEST_SELLERS_QUERY,
    variables: {
      count,
      handle,
    },
    cache: CacheLong(),
    preload: true,
  });

  return (
    <ProductGrid products={data.collection.products.nodes} theme={theme} />
  );
}

const BEST_SELLERS_QUERY = gql`
  ${COLLECTION_PRODUCT_FRAGMENT}
  ${MEDIA_FRAGMENT}
  query bestSellers(
    $count: Int
    $countryCode: CountryCode
    $languageCode: LanguageCode
    $handle: String
  ) @inContext(country: $countryCode, language: $languageCode) {
    collection(handle: $handle) {
      products(
        first: $count
        filters: {
          productMetafield: {
            namespace: "suave"
            key: "hydrogen_es_enabled"
            value: "true"
          }
        }
      ) {
        nodes {
          ...CollectionProduct
        }
      }
    }
  }
`;
