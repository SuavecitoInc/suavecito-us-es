import {Seo} from '@shopify/hydrogen';
import {
  PageHeader,
  CartPageDetails,
  CartFreeGiftWithPurchase,
  ResponsiveBanner,
} from '~/components';
import {Layout} from '~/components/index.server';

import {FGWP_ENABLED} from '~/data/free-gift-with-purchase';

import {ENABLE_CART_BANNER, responsiveBannerSettings} from '../data/cart';

export default function Cart() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const title = LANG === 'es' ? 'Tu carrito' : 'Your Cart';

  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      {ENABLE_CART_BANNER && <ResponsiveBanner {...responsiveBannerSettings} />}
      <PageHeader heading={title} className="mx-auto max-w-7xl" />
      <CartPageDetails layout="page" />
      {FGWP_ENABLED && <CartFreeGiftWithPurchase />}
    </Layout>
  );
}
