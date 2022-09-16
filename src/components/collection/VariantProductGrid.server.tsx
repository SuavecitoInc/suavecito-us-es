import {useState, useRef, useEffect, useCallback} from 'react';
import {Link} from '@shopify/hydrogen';
import {getImageLoadingPriority} from '~/lib/const';

import {Button, Grid} from '~/components';

import type {
  Collection,
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

import {ProductGridItem, VariantGridItem} from '~/components';

export function VariantProductGrid({
  url,
  collection,
  theme = 'suavecito',
  lang = 'en',
}: {
  url: string;
  collection: Collection;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
  const viewMore = {
    en: 'View more',
    es: 'Ver mas',
  };

  const products = collection?.products?.nodes || [];
  const haveProducts = products.length > 0;

  if (!haveProducts) {
    return (
      <>
        <p>No products found on this collection</p>
        <Link to="/products">
          <p className="underline">Browse catalog</p>
        </Link>
      </>
    );
  }

  const styles = {
    flexParent: `flex flex-col md:flex-row`,
    flexChild: `flex-1 p-5 overflow-hidden w-full md:w-[50%]`,
    btnWrapper: `flex justify-center items-center`,
    btn: `btn`,
  };

  return (
    <>
      <section className="my-8">
        <Grid layout="products">
          {products.length &&
            products.map((product, i) => (
              <div key={product.id}>
                <CollectionGridItem
                  product={product}
                  index={i}
                  theme={theme}
                  collection={collection}
                />
              </div>
            ))}
        </Grid>
      </section>
    </>
  );
}

function CollectionGridItem({
  product,
  index,
  theme,
  collection,
}: {
  product: Product;
  index: number;
  theme: BrandTheme;
  collection: Collection;
}) {
  interface Metafield {
    value: string;
    reference?: object;
  }
  interface ProductVariantWithMetafield extends ProductVariant {
    variantTitle?: Metafield | null;
  }
  const featuredVariant = product.variants.nodes.findIndex(
    (_variant: ProductVariantWithMetafield) =>
      _variant.variantTitle &&
      collection.title.includes(_variant.variantTitle.value),
  );
  return (
    <>
      {featuredVariant !== -1 ? (
        <VariantGridItem
          product={product}
          loading={getImageLoadingPriority(index)}
          theme={theme}
          variantIndex={featuredVariant}
        />
      ) : (
        <ProductGridItem
          product={product}
          loading={getImageLoadingPriority(index)}
          theme={theme}
        />
      )}
    </>
  );
}
