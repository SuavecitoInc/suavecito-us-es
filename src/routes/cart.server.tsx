import {Seo, gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
import {FREE_GIFT_PRODUCT_CARD_FRAGMENT} from '~/lib/suavecito-fragments';
import {
  PageHeader,
  CartPageDetails,
  CartFreeGiftWithPurchase,
} from '~/components';
import {Layout} from '~/components/index.server';

import {FreeGiftProvider} from '~/components/FreeGiftProvider/FreeGiftProvider.client';
import {
  FGWP_ENABLED,
  FGWP_1,
  FGWP_2,
  FGWP_3,
  FGWP_4,
} from '~/data/free-gift-with-purchase';

export default function Cart() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {
    data: {fgwp1, fgwp2, fgwp3, fgwp4},
  } = useShopQuery({
    query: FGWP_QUERY,
    variables: {
      handle1: FGWP_1,
      handle2: FGWP_2,
      handle3: FGWP_3,
      handle4: FGWP_4,
    },
    preload: true,
    cache: CacheLong(),
  });

  const freeGifts = [fgwp1, fgwp2, fgwp3, fgwp4];

  const title = LANG === 'es' ? 'Tu carrito' : 'Your Cart';

  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading={title} className="max-w-7xl mx-auto" />
      <FreeGiftProvider freeGifts={freeGifts} enabled={FGWP_ENABLED}>
        <CartPageDetails layout="page" />
        {FGWP_ENABLED && <CartFreeGiftWithPurchase />}
      </FreeGiftProvider>
    </Layout>
  );
}

const FGWP_QUERY = gql`
  ${FREE_GIFT_PRODUCT_CARD_FRAGMENT}
  query freeGifts(
    $handle1: String!
    $handle2: String!
    $handle3: String!
    $handle4: String!
  ) {
    fgwp1: product(handle: $handle1) {
      ...FreeGiftProductCard
    }
    fgwp2: product(handle: $handle2) {
      ...FreeGiftProductCard
    }
    fgwp3: product(handle: $handle3) {
      ...FreeGiftProductCard
    }
    fgwp4: product(handle: $handle4) {
      ...FreeGiftProductCard
    }
  }
`;
