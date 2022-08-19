import {useState, useRef, useEffect, useCallback} from 'react';
import {Link, flattenConnection} from '@shopify/hydrogen';
import {getImageLoadingPriority} from '~/lib/const';

import {Button, Grid} from '~/components';

import type {
  Collection,
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

import {ProductGridItem, VariantGridItem} from '~/components';

export function VariantProductRow({
  url,
  collection,
  theme = 'suavecito',
}: {
  url: string;
  collection: Collection;
  theme?: BrandTheme;
}) {
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [pending, setPending] = useState(false);
  const haveProducts = initialProducts.length > 0;

  const fetchProducts = useCallback(async () => {
    setPending(true);
    const postUrl = new URL(window.location.origin + url);
    postUrl.searchParams.set('cursor', cursor);

    const response = await fetch(postUrl, {
      method: 'POST',
    });
    const {data} = await response.json();

    // ProductGrid can paginate collection, products and search routes
    // @ts-ignore TODO: Fix types
    const newProducts: Product[] = flattenConnection<Product>(
      data?.collection?.products || data?.products || [],
    );
    const {endCursor, hasNextPage} = data?.collection?.products?.pageInfo ||
      data?.products?.pageInfo || {endCursor: '', hasNextPage: false};

    setProducts([...products, ...newProducts]);
    setCursor(endCursor);
    setNextPage(hasNextPage);
    setPending(false);
  }, [cursor, url, products]);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          fetchProducts();
        }
      });
    },
    [fetchProducts],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: '100%',
    });

    const nextButton = nextButtonRef.current;

    if (nextButton) observer.observe(nextButton);

    return () => {
      if (nextButton) observer.unobserve(nextButton);
    };
  }, [nextButtonRef, cursor, handleIntersect]);

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
            products.slice(0, 3).map((product, i) => (
              <div key={product.id}>
                <CollectionGridItem
                  product={product}
                  index={i}
                  theme={theme}
                  collection={collection}
                />
              </div>
            ))}
          {products.length > 3 && (
            <div className={styles.btnWrapper}>
              <Link to={url} className={styles.btn}>
                <Button variant={theme}>View More</Button>
              </Link>
            </div>
          )}
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
