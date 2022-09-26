import {useRef, useEffect, useState} from 'react';
import {useWindowScroll} from 'react-use';
import {Image, Money, useProductOptions} from '@shopify/hydrogen';
import {AddToCartButton, Text} from '../index';

export function ProductMobileSelection({
  productTitle,
  theme = 'suavecito',
}: {
  productTitle: string;
  theme?: 'suavecito' | 'suavecita';
}) {
  const scrollRef = useRef<null | HTMLDivElement>(null);
  const {x, y} = useWindowScroll();

  const {selectedVariant} = useProductOptions();

  const [top, setTop] = useState<number>(1000);

  useEffect(() => {
    if (!scrollRef.current) return;
    setTop(scrollRef.current.offsetTop);
  }, []);

  const visibleStyles = `z-100 fixed top-0 left-0 right-0 w-full border-b-2 border-black`;
  const hiddenStyles = `h-0 opacity-0`;

  const isOutOfStock = !selectedVariant?.availableForSale || false;

  const isOnSale =
    selectedVariant?.priceV2?.amount &&
    selectedVariant?.compareAtPriceV2?.amount
      ? selectedVariant?.priceV2?.amount <
          selectedVariant?.compareAtPriceV2?.amount || false
      : false;

  return (
    <div
      ref={scrollRef}
      className={`bg-white z-10 flex md:hidden ${
        y >= top - 300 ? visibleStyles : hiddenStyles
      }`}
    >
      <div className="w-[30%] p-2">
        <Image
          // @ts-ignore
          data={selectedVariant?.image}
          // @ts-ignore
          alt={selectedVariant?.image.altText}
        />
      </div>
      <div className="w-[70%] p-2">
        <div className="font-bold uppercase">{productTitle}</div>
        <div>{selectedVariant?.title}</div>
        <div className="mb-4">
          {selectedVariant && (
            <Money
              withoutTrailingZeros
              // @ts-ignore
              data={selectedVariant?.priceV2}
              as="span"
            />
          )}

          {isOnSale && (
            <>
              {selectedVariant && selectedVariant.compareAtPriceV2 && (
                <Money
                  withoutTrailingZeros
                  data={selectedVariant.compareAtPriceV2!}
                  as="span"
                  className="ml-3 opacity-50 strike"
                />
              )}
            </>
          )}
        </div>
        <AddToCartButton
          variantId={selectedVariant?.id}
          quantity={1}
          accessibleAddingToCartLabel="Adding item to your cart"
          disabled={isOutOfStock}
          className=""
          width="full"
          variant={isOutOfStock ? 'secondary' : theme}
          as="span"
        >
          {isOutOfStock ? (
            <Text>Sold out</Text>
          ) : (
            <Text as="span" className="flex items-center justify-center gap-2">
              <span>ADD TO CART</span>
            </Text>
          )}
        </AddToCartButton>
      </div>
    </div>
  );
}
