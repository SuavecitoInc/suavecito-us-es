import {useRef, useContext} from 'react';
import {useScroll} from 'react-use';
import {
  ClientAnalytics,
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty} from '~/components';
import {AUTO_ADD_DISCOUNT, DISCOUNT_CODE} from '~/data/discounts';

const cart_details: {[key: string]: any} = {
  subtotal: {
    en: 'Subtotal',
    es: 'Total Parcial',
  },
  continue_to_checkout: {
    en: 'Continue to Checkout',
    es: 'Seguir al Pago',
  },
  continue_to_cart: {
    en: 'Continue to Cart',
    es: 'Continuar con el carrito',
  },
  order_summary: {
    en: 'Order Summary',
    es: 'Resumen del pedido',
  },
  free_gift: {
    first: {
      en: 'You are',
      es: '¡Estás a',
    },
    second: {
      en: 'away from unlocking a FREE Gift!',
      es: 'de obtener un regalo GRATIS!',
    },
  },
};

export function CartDetails({
  layout,
  onClose,
  freeGiftEnabled,
  disableCheckout,
  amountToFreeGift,
}: {
  layout: 'drawer' | 'page';
  onClose?: () => void;
  freeGiftEnabled: boolean;
  disableCheckout: boolean;
  amountToFreeGift: number;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} layout={layout} />;
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

  return (
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
      <section aria-labelledby="summary-heading" className={summary[layout]}>
        <h2 id="summary-heading" className="sr-only">
          {cart_details.order_summary[LANG]}
        </h2>
        <OrderSummary />
        <CartCheckoutActions
          lang={LANG}
          disableCheckout={freeGiftEnabled ? disableCheckout : false}
          amountToFreeGift={freeGiftEnabled ? amountToFreeGift : 0}
          onClose={onClose}
        />
      </section>
    </form>
  );
}

function CartCheckoutActions({
  lang,
  disableCheckout,
  amountToFreeGift,
  onClose,
}: {
  lang: 'en' | 'es';
  disableCheckout: boolean;
  amountToFreeGift: number;
  onClose?: () => void;
}) {
  const {checkoutUrl, cost, lines} = useCart();

  const webCheckoutUrl = `${checkoutUrl}?locale=es${
    AUTO_ADD_DISCOUNT && DISCOUNT_CODE ? `&discount=${DISCOUNT_CODE}` : ''
  }`;

  const handleCheckout = () => {
    // emit custom begin checkout event
    ClientAnalytics.publish('CUSTOM_BEGIN_CHECKOUT', true, {
      cart: {
        cost,
        lines,
      },
    });
  };

  return (
    <>
      <div className="grid gap-4">
        {amountToFreeGift > 0 ? (
          <p className="text-center">
            {cart_details.free_gift.first[lang]}{' '}
            <span className="text-suave-red">${amountToFreeGift}</span>{' '}
            {cart_details.free_gift.second[lang]}
          </p>
        ) : null}
        {disableCheckout ? (
          <Button to="/cart#fgwp" onClick={onClose && onClose}>
            {cart_details.continue_to_cart[lang]}
          </Button>
        ) : (
          <>
            <Button to={webCheckoutUrl} onClick={handleCheckout}>
              {cart_details.continue_to_checkout[lang]}
            </Button>
            <CartShopPayButton />
          </>
        )}
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
