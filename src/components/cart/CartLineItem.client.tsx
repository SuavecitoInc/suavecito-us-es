import {
  useCart,
  useCartLine,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
  Image,
  Link,
} from '@shopify/hydrogen';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

import {Heading, IconRemove, Text} from '~/components';

export function CartLineItem() {
  const {linesRemove} = useCart();
  const {id: lineId, quantity, merchandise, attributes} = useCartLine();

  const isFgwpItem = attributes.find((el) => el.key === '_fgwp') ? true : false;
  const isFgcwpItem = attributes.find((el) => el.key === '_fgcwp')
    ? true
    : false;

  return (
    <li key={lineId} className="flex gap-4">
      <div className="flex-shrink">
        <Image
          width={120}
          height={96}
          widths={[120]}
          data={merchandise.image as ImageType}
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
          className="object-contain object-center w-24 h-24 border rounded md:w-28 md:h-28"
        />
      </div>

      <div className="flex justify-between flex-grow">
        <div className="grid gap-2">
          <Heading as="h3" size="copy">
            <Link to={`/products/${merchandise.product.handle}`}>
              {merchandise.product.title}
            </Link>
          </Heading>

          <div className="grid pb-2">
            {/* {(merchandise?.selectedOptions || []).map((option) => (
              <Text color="subtle" key={option.name}>
                {option.name}: {option.value}
              </Text>
            ))} */}
            {(merchandise?.selectedOptions || []).map((option) => {
              if (option.name === 'Title' && option.value === 'Default Title')
                return null;
              return (
                <Text color="subtle" key={option.name}>
                  {option.name}: {option.value}
                </Text>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex justify-start text-copy">
              {!isFgwpItem && !isFgcwpItem ? (
                <CartLineQuantityAdjust lineId={lineId} quantity={quantity} />
              ) : (
                <p>{quantity}</p>
              )}
            </div>
            <button
              type="button"
              onClick={() => linesRemove([lineId])}
              className="flex items-center justify-center w-10 h-10 border rounded"
            >
              <span className="sr-only">Remove</span>
              <IconRemove aria-hidden="true" />
            </button>
          </div>
        </div>
        <Text>
          <CartLinePrice as="span" />
        </Text>
      </div>
    </li>
  );
}

function CartLineQuantityAdjust({
  lineId,
  quantity,
}: {
  lineId: string;
  quantity: number;
}) {
  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border rounded">
        <CartLineQuantityAdjustButton
          adjust="decrease"
          aria-label="Decrease quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#8722;
        </CartLineQuantityAdjustButton>
        <CartLineQuantity as="div" className="px-2 text-center" />
        <CartLineQuantityAdjustButton
          adjust="increase"
          aria-label="Increase quantity"
          className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:cursor-wait"
        >
          &#43;
        </CartLineQuantityAdjustButton>
      </div>
    </>
  );
}
