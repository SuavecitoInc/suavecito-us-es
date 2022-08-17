import {
  Seo,
  gql,
  useShopQuery,
  CacheLong,
  CartProvider,
} from '@shopify/hydrogen';
import {FREE_GIFT_PRODUCT_CARD_FRAGMENT} from '~/lib/suavecito-fragments';
import {PageHeader, CartPageDetails} from '~/components';
import {Layout} from '~/components/index.server';

export default function Cart() {
  const {
    data: {fgwp1, fgwp2, fgwp3, fgwp4},
  } = useShopQuery({
    query: FGWP_QUERY,
    variables: {
      handle1: 'cosmetic-bag-beige-fgwp',
      handle2: 'hand-sanitizer-fgwp',
      handle3: 'lipgrip-tenacity-fgwp',
      handle4: 'shave-soap-whiskey-bar-fgwp',
    },
    preload: true,
    cache: CacheLong(),
  });

  const freeGifts = [fgwp1, fgwp2, fgwp3, fgwp4];

  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading="Your Cart" className="max-w-7xl mx-auto" />
      <CartProvider>
        <CartPageDetails layout="page" freeGifts={freeGifts} />
      </CartProvider>
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
