import {useRef} from 'react';
import {useScroll} from 'react-use';
import {
  ClientAnalytics,
  useCart,
  CartLineProvider,
  CartShopPayButton,
  Money,
} from '@shopify/hydrogen';

import {Button, Text, CartLineItem, CartEmpty, Section} from '~/components';
import {useFreeGiftWithPurchase} from '../FreeGiftProvider/';

const cart_page: {[key: string]: any} = {
  subtotal: {
    en: 'Subtotal',
    es: 'Total Parcial',
  },
  continue_to_checkout: {
    en: 'Continue to Checkout',
    es: 'Siguir al Pago',
  },
  please_add_free_gift: {
    en: 'Please Add Free Gift Below To Continue',
    es: 'Agregue un regalo gratis para continuar',
  },
  order_summary: {
    en: 'Order Summary',
    es: 'Resumen del pedido',
  },
};

export function CartPageDetails({
  layout,
  onClose,
}: {
  layout: 'drawer' | 'page';
  onClose?: () => void;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {enabled, freeGiftsInCart, freeGiftsEligible, currentTier} =
    useFreeGiftWithPurchase();

  const {lines} = useCart();
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  if (lines.length === 0) {
    return (
      <Section className="mx-auto max-w-7xl">
        <CartEmpty onClose={onClose} layout={layout} />
      </Section>
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
    <Section className="mx-auto max-w-7xl">
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
            {cart_page.order_summary[LANG]}
          </h2>
          <OrderSummary lang={LANG} />
          <CartCheckoutActions
            lang={LANG}
            disableCheckout={enabled ? freeGiftAvailable : false}
          />
        </section>
      </form>
    </Section>
  );
}

function CartCheckoutActions({
  lang,
  disableCheckout,
}: {
  lang: 'EN' | 'ES';
  disableCheckout: boolean;
}) {
  const {checkoutUrl, cost, lines} = useCart();
  const localeCheckoutUrl = `${checkoutUrl}?locale=es`;

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
        {!disableCheckout ? (
          <>
            <Button to={localeCheckoutUrl} onClick={handleCheckout}>
              {cart_page.continue_to_checkout[lang]}
            </Button>
            <CartShopPayButton />
          </>
        ) : (
          <Button type="button" variant="secondary" disabled={true}>
            {cart_page.please_add_free_gift[lang]}
          </Button>
        )}
      </div>
    </>
  );
}

function OrderSummary({lang}: {lang: 'EN' | 'ES'}) {
  const {cost} = useCart();
  return (
    <>
      <dl className="grid">
        <div className="flex items-center justify-between font-medium">
          <Text as="dt">{cart_page.subtotal[lang]}</Text>
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
