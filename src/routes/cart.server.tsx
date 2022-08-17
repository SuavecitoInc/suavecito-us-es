import {Seo, gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
import {FREE_GIFT_PRODUCT_CARD_FRAGMENT} from '~/lib/suavecito-fragments';
import {PageHeader, CartPageDetails, CartDetails, Section} from '~/components';
import {Layout} from '~/components/index.server';

export default function Cart() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

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

  const title = LANG === 'es' ? 'Tu carrito' : 'Your Cart';

  return (
    <Layout>
      <Seo type="page" data={{title: 'Cart'}} />
      <PageHeader heading={title} className="max-w-7xl mx-auto" />
      <CartPageDetails layout="page" freeGifts={freeGifts} />
      {/* <Section className="max-w-7xl mx-auto">
        <CartDetails layout="page" />
      </Section> */}
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
