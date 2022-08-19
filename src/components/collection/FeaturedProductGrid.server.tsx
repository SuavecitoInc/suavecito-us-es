import {Link} from '@shopify/hydrogen';
import {getImageLoadingPriority} from '~/lib/const';

import {
  Button,
  Grid,
  ProductColorSwatches,
  ProductGridItem,
  ProductImageCarousel,
} from '~/components';
import {AdBanners} from '~/data/ad-banners';

import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

export function FeaturedProductGrid({
  url,
  collection,
  position = 'left',
  theme = 'suavecito',
  lang = 'en',
}: {
  position?: string;
  url: string;
  collection: Collection;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
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

  const hasCarouselImages = AdBanners[collection.handle] ? true : false;

  return (
    <>
      {hasCarouselImages ? (
        <CollectionRowWithCarousel
          collection={collection}
          products={products}
          position={position}
          theme={theme}
          styles={styles}
          url={url}
          lang={lang}
        />
      ) : (
        <CollectionRowWithoutCarousel
          collection={collection}
          products={products}
          position={position}
          theme={theme}
          styles={styles}
          url={url}
          lang={lang}
        />
      )}
    </>
  );
}

function CollectionGridItem({
  product,
  index,
  theme,
}: {
  product: Product;
  index: number;
  theme: BrandTheme;
}) {
  return (
    <>
      <ProductGridItem
        product={product}
        loading={getImageLoadingPriority(index)}
        theme={theme}
      />
      <ProductColorSwatches product={product} theme={theme} />
    </>
  );
}

function CollectionRowWithCarousel({
  collection,
  products,
  position,
  theme,
  styles,
  url,
  lang = 'en',
}: {
  collection: Collection;
  products: Product[];
  position: string;
  theme: BrandTheme;
  styles: {[key: string]: string};
  url: string;
  lang?: 'en' | 'es';
}) {
  const viewMore = {
    en: 'View more',
    es: 'Ver más',
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
            <ProductImageCarousel collection={collection} lang={lang} />
          </div>
          <div
            className={`${styles.flexChild} ${
              position === 'left' ? 'order-2' : 'order-1'
            }`}
          >
            <p className="font-nexa-rust text-left text-[1.5rem] sm-max:text-[1.2rem] mb-4">
              {collection['headingName']
                ? collection['headingName'].value
                : collection.title}
            </p>
            <Grid items={2} layout="products">
              {products.slice(0, 4).map((product, i) => (
                <div key={product.id}>
                  <CollectionGridItem
                    product={product}
                    index={i}
                    theme={theme}
                  />
                </div>
              ))}
            </Grid>
          </div>
        </div>
        <Grid layout="products">
          {products.length > 3 &&
            products.slice(4, 11).map((product, i) => (
              <div key={product.id}>
                <CollectionGridItem product={product} index={i} theme={theme} />
              </div>
            ))}
          {products.length > 11 && (
            <div className={styles.btnWrapper}>
              <Link to={url} className={styles.btn}>
                <Button variant={theme}>{viewMore[lang]}</Button>
              </Link>
            </div>
          )}
        </Grid>
      </section>
    </>
  );
}

function CollectionRowWithoutCarousel({
  collection,
  products,
  position,
  theme,
  styles,
  url,
  lang = 'en',
}: {
  collection: Collection;
  products: Product[];
  position: string;
  theme: BrandTheme;
  styles: {[key: string]: string};
  url: string;
  lang?: 'en' | 'es';
}) {
  const viewMore = {
    en: 'View more',
    es: 'Ver más',
  };
  return (
    <>
      <section className="my-8">
        <p className="font-nexa-rust text-left text-[1.5rem] sm-max:text-[1.2rem] mb-4">
          {collection['headingName']
            ? collection['headingName'].value
            : collection.title}
        </p>
        <Grid layout="products">
          {products.slice(0, 11).map((product, i) => (
            <div key={product.id}>
              <CollectionGridItem product={product} index={i} theme={theme} />
            </div>
          ))}
          {products.length > 11 && (
            <div className={styles.btnWrapper}>
              <Link to={url} className={styles.btn}>
                <Button variant={theme}>{viewMore[lang]}</Button>
              </Link>
            </div>
          )}
        </Grid>
      </section>
    </>
  );
}
