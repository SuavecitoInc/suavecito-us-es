import {Seo} from '@shopify/hydrogen';
import {
  PageHeader,
  CartPageDetails,
  CartFreeGiftWithPurchase,
} from '~/components';
import {Layout} from '~/components/index.server';

import {FGWP_ENABLED} from '~/data/free-gift-with-purchase';

export default function Cart() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const title = LANG === 'es' ? 'Tu carrito' : 'Your Cart';

  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading={title} className="mx-auto max-w-7xl" />
      <CartPageDetails layout="page" />
      {FGWP_ENABLED && <CartFreeGiftWithPurchase />}
    </Layout>
  );
}
