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
  const nextButtonRef = useRef(null);
  const initialProducts = collection?.products?.nodes || [];
  const {hasNextPage, endCursor} = collection?.products?.pageInfo ?? {};
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cursor, setCursor] = useState(endCursor ?? '');
  const [nextPage, setNextPage] = useState(hasNextPage);
  const [pending, setPending] = useState(false);
  const haveProducts = products.length > 0;

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
  const productGridData = {
    loading: {
      en: 'Loading...',
      es: 'Cargando...',
    },
    load_more_products: {
      en: 'Load more products',
      es: 'Cargar más productos',
    },
  };

  return (
    <>
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
      {nextPage && (
        <div
          className="flex items-center justify-center mt-6"
          ref={nextButtonRef}
        >
          <Button
            variant="secondary"
            disabled={pending}
            onClick={fetchProducts}
            width="full"
          >
            {pending
              ? productGridData.loading[lang]
              : productGridData.load_more_products[lang]}
          </Button>
        </div>
      )}
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
