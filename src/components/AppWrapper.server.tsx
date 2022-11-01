import {ReactNode} from 'react';
import {gql, useShopQuery, CacheLong} from '@shopify/hydrogen';
// FGWP
import {FREE_GIFT_PRODUCT_CARD_FRAGMENT} from '~/lib/suavecito-fragments';
import {FreeGiftProvider} from '~/components/FreeGiftProvider/FreeGiftProvider.client';
import {FGWP_1, FGWP_2, FGWP_3, FGWP_4} from '~/data/free-gift-with-purchase';
// FGCWP
import {FreeGiftCardProvider} from '~/components/FreeGiftCardProvider/FreeGiftCardProvider.client';
import {FGCWP_1, FGCWP_2} from '~/data/free-gift-card-with-purchase';

export function AppWrapper({children}: {children: ReactNode}) {
  const {
    data: {fgwp1, fgwp2, fgwp3, fgwp4, fgcwp1, fgcwp2},
  }: any = useShopQuery({
    query: FGWP_QUERY,
    variables: {
      handle1: FGWP_1,
      handle2: FGWP_2,
      handle3: FGWP_3,
      handle4: FGWP_4,
      handle5: FGCWP_1,
      handle6: FGCWP_2,
    },
    preload: true,
    cache: CacheLong(),
  });

  const freeGifts = [fgwp1, fgwp2, fgwp3, fgwp4];

  const freeGiftCards = [fgcwp1, fgcwp2];

  return (
    <FreeGiftProvider freeGifts={freeGifts}>
      <FreeGiftCardProvider freeGiftCards={freeGiftCards}>
        {children}
      </FreeGiftCardProvider>
    </FreeGiftProvider>
  );
}

const FGWP_QUERY = gql`
  ${FREE_GIFT_PRODUCT_CARD_FRAGMENT}
  query freeGifts(
    $handle1: String!
    $handle2: String!
    $handle3: String!
    $handle4: String!
    $handle5: String!
    $handle6: String!
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
    fgcwp1: product(handle: $handle5) {
      ...FreeGiftProductCard
    }
    fgcwp2: product(handle: $handle6) {
      ...FreeGiftProductCard
    }
  }
`;
