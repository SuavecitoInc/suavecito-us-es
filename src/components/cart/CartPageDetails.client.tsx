import {useRef} from 'react';
import {useScroll} from 'react-use';
import {
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';

import {
  Button,
  Text,
  CartLineItem,
  CartEmpty,
  CartFreeGiftWithPurchase,
} from '~/components';
import {useFreeGiftWithPurchase} from '~/hooks/useFreeGiftWithPurchase';

export function CartPageDetails({
  layout,
  onClose,
  freeGifts,
}: {
  layout: 'drawer' | 'page';
  onClose?: () => void;
  freeGifts: Product[];
}) {
  const {
    tier1Diff,
    tier2Diff,
    tier3Diff,
    tier1Products,
    tier2Products,
    tier3Products,
    tier1Value,
    setTier1Value,
    tier2Value,
    setTier2Value,
    tier3Value1,
    setTier3Value1,
    tier3Value2,
    setTier3Value2,
    currentTier,
    setCurrentTier,
    freeGiftsInCart,
    addFreeGiftToCart,
    freeGiftsEligible,
  } = useFreeGiftWithPurchase(freeGifts);

  const fgwp = {
    tier1Diff,
    tier2Diff,
    tier3Diff,
    tier1Products,
    tier2Products,
    tier3Products,
    tier1Value,
    setTier1Value,
    tier2Value,
    setTier2Value,
    tier3Value1,
    setTier3Value1,
    tier3Value2,
    setTier3Value2,
    currentTier,
    setCurrentTier,
    freeGiftsInCart,
    addFreeGiftToCart,
    freeGiftsEligible,
  };

  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  if (lines.length === 0) {
    return (
      <section className="max-w-7xl mx-auto">
        <CartEmpty onClose={onClose} layout={layout} />
      </section>
    );
  }

  const container = {
    drawer: 'grid grid-cols-1 h-screen-no-nav grid-rows-[1fr_auto]',
    page: 'pb-12 grid md:grid-cols-2 md:items-start gap-8 md:gap-8 lg:gap-12',
  };

  const content = {
    drawer: 'px-6 pb-6 sm-max:pt-2 overflow-auto transition md:px-12',
    page: 'flex-grow md:translate-y-4',
  };

  const summary = {
    drawer: 'grid gap-6 p-6 border-t md:px-12',
    page: 'sticky top-nav grid gap-6 p-4 md:px-6 md:translate-y-4 bg-primary/5 rounded w-full',
  };

  const freeGiftAvailable = freeGiftsInCart < freeGiftsEligible[currentTier];

  return (
    <>
      <section className="max-w-7xl mx-auto">
        <form className={container[layout]}>
          <section
            ref={scrollRef}
            aria-labelledby="cart-contents"
            className={`${content[layout]} ${y > 0 ? 'border-t' : ''}`}
          >
            <ul className="grid gap-6 md:gap-10">
              {lines.map((line) => {
                return (
                  <CartLineProvider key={line.id} line={line}>
                    <CartLineItem />
                  </CartLineProvider>
                );
              })}
            </ul>
          </section>
          <section
            aria-labelledby="summary-heading"
            className={summary[layout]}
          >
            <h2 id="summary-heading" className="sr-only">
              Order summary
            </h2>
            <OrderSummary />
            <CartCheckoutActions disableCheckout={freeGiftAvailable} />
          </section>
        </form>
      </section>
      <CartFreeGiftWithPurchase {...fgwp} />
    </>
  );
}

function CartCheckoutActions({disableCheckout}: {disableCheckout: boolean}) {
  const {checkoutUrl} = useCart();
  const localeCheckoutUrl = `${checkoutUrl}?locale=es`;

  return (
    <>
      <div className="grid gap-4">
        {!disableCheckout ? (
          <Button to={localeCheckoutUrl}>Continue to Checkout</Button>
        ) : (
          <button type="button" disabled={true}>
            Please add FREE Gift Below
          </button>
        )}

        <CartShopPayButton />
      </div>
    </>
  );
}

function OrderSummary() {
  const {cost} = useCart();
  return (
    <>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">Subtotal</Text>
          <Text as="dd">
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </Text>
        </div>
      </dl>
    </>
  );
}
