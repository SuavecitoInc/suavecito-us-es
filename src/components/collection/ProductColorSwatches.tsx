import type {
  Product,
  ProductVariant,
} from '@shopify/hydrogen/storefront-api-types';
import {BrandTheme} from '~/types/suavecito';
import {Image, Metafield, Link} from '@shopify/hydrogen';
export function ProductColorSwatches({
  product,
  theme = 'suavecito',
}: {
  product: Product;
  theme?: BrandTheme;
}) {
  const styles = {
    wrapper: `grid gap-[.5em] grid-cols-3 lg:grid-cols-6 grid-rows-1 mt-[6px] w-full max-w-[120px] lg:max-w-full`,
    imageWrapper: ``,
    swatch: ``,
    image: `rounded-[50%] border border-solid border-black`,
  };
  const themeCorrected = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  const textColor = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
  };
  const remainingSwatches = product.variants.nodes.length - 5;
  const showSwatches = product.variants.nodes.every(
    (variant: any) => variant.variantColorImage !== null,
  );

  const parseId = (id: string) => {
    return id.split('/').pop();
  };
  return showSwatches ? (
    <div className={styles.wrapper}>
      {product.variants.nodes.slice(0, 5).map(
        (variant: ProductVariant) =>
          variant.variantColorImage && (
            <div className={styles.imageWrapper} key={variant.id}>
              <Link
                className={styles.swatch}
                to={`/products/${product.handle}?variant=${parseId(
                  variant.id,
                )}`}
              >
                <Image
                  className={styles.image}
                  data={variant.variantColorImage.reference.image}
                  width={60}
                  height={60}
                  alt={`${variant.title} color swatch`}
                />
              </Link>
            </div>
          ),
      )}
      {remainingSwatches > 0 && (
        <Link
          to={`/products/${product.handle}`}
          className={`${styles.image} grid place-items-center ${textColor[themeCorrected]}`}
        >
          <div>+{remainingSwatches}</div>
        </Link>
      )}
    </div>
  ) : (
    <></>
  );
}
