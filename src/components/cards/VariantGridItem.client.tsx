import clsx from 'clsx';
import {
  flattenConnection,
  Image,
  Link,
  Money,
  useMoney,
} from '@shopify/hydrogen';

import {Badge, Text} from '~/components';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import type {
  MoneyV2,
  Product,
  ProductVariant,
  ProductVariantConnection,
} from '@shopify/hydrogen/storefront-api-types';

import type {BrandTheme} from '~/types/suavecito';

export function VariantGridItem({
  theme = 'suavecito',
  product,
  label,
  className,
  loading,
  onClick,
  titleColor = 'suave-red',
  variantIndex,
}: {
  theme?: BrandTheme;
  product: Product;
  label?: 'Sale' | 'New';
  className?: string;
  loading?: HTMLImageElement['loading'];
  onClick?: () => void;
  titleColor?: string;
  variantIndex: number;
}) {
  let cardLabel: 'Sale' | 'New' | undefined;
  const selectedVariant = product.variants.nodes[variantIndex];

  const cardData = product?.variants ? product : getProductPlaceholder();
  const {
    image,
    priceV2: price,
    compareAtPriceV2: compareAtPrice,
  } = flattenConnection<ProductVariant>(
    cardData?.variants as ProductVariantConnection,
  )[variantIndex] || {};

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const styles = clsx('grid gap-6 bg-white', className);

  const colors: {[key: string]: string} = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
    'premium blends': 'text-suave-red',
    'firme club': 'text-suave-red',
    'cerveza cito': 'text-suave-red',
    'tres noir': 'text-suave-red',
  };

  const parseId = (id: string) => {
    return id.split('/').pop();
  };

  return (
    <Link
      onClick={onClick}
      to={`/products/${product.handle}?variant=${parseId(selectedVariant.id)}`}
    >
      <div className={styles}>
        <div className="product-image hover:opacity-80">
          {image && (
            <Image
              className="w-full object-contain fadeIn"
              widths={[320]}
              sizes="320px"
              loaderOptions={{
                scale: 2,
                width: 320,
                height: 400,
              }}
              // @ts-ignore Stock type has `src` as optional
              data={image}
              alt={image.altText || `Picture of ${product.title}`}
              loading={loading}
            />
          )}
        </div>
        <div className="grid gap-1">
          <Text
            className={`w-full uppercase font-bold text-${titleColor} overflow-hidden whitespace-nowrap text-ellipsis ${colors[theme]}`}
            as="h3"
          >
            {product.title}
          </Text>
          <div className="flex gap-4">
            <Text className="flex gap-4 font-bold">
              <Money withoutTrailingZeros data={price!} />
              {isDiscounted(price as MoneyV2, compareAtPrice as MoneyV2) && (
                <CompareAtPrice
                  className={'opacity-50'}
                  data={compareAtPrice as MoneyV2}
                />
              )}
              {(cardLabel === 'Sale' || product.tags.includes('On Sale')) && (
                <Badge label={cardLabel} tags={product.tags} />
              )}
            </Text>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CompareAtPrice({
  data,
  className,
}: {
  data: MoneyV2;
  className?: string;
}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);

  const styles = clsx('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
