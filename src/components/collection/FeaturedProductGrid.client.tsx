import {useState, useRef, useEffect, useCallback} from 'react';
import {Link, flattenConnection} from '@shopify/hydrogen';

import {Button, Grid, ProductCard} from '~/components';
import {getImageLoadingPriority} from '~/lib/const';
import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';

import {ProductGridItem, ProductImageCarousel} from '~/components';

export function FeaturedProductGrid({
  url,
  collection,
  position = 'left',
}: {
  position?: string;
  url: string;
  collection: Collection;
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
    flexParent: `flex flex-row sm-max:flex-col`,
    flexChild: `flex-1 mx-5 my-5`,
  };

  return (
    <>
      <section className="my-8">
        <div className={styles.flexParent}>
          <div
            className={`${styles.flexChild} ${
              position === 'left' ? 'order-1' : 'order-2'
            }`}
          >
            <ProductImageCarousel collection={collection} />
          </div>
          <div
            className={`${styles.flexChild} ${
              position === 'left' ? 'order-2' : 'order-1'
            }`}
          >
            <p className="font-nexa-rust text-left text-[1.5rem] sm-max:text-[1.2rem] mb-4">
              {collection.title}
            </p>
            <Grid items={2} layout="products">
              {products.slice(0, 4).map((product, i) => (
                <ProductGridItem
                  key={product.id}
                  product={product}
                  loading={getImageLoadingPriority(i)}
                />
              ))}
            </Grid>
          </div>
        </div>
        <Grid layout="products">
          {products.length > 3 &&
            products
              .slice(4)
              .map((product, i) => (
                <ProductGridItem
                  key={product.id}
                  product={product}
                  loading={getImageLoadingPriority(i)}
                />
              ))}
        </Grid>
      </section>
    </>
  );
}
