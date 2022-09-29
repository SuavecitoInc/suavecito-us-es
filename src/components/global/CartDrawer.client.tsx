import {CartDetails} from '~/components/cart';
import {Drawer} from './Drawer.client';

import {useFreeGiftWithPurchase} from '../FreeGiftProvider/';

export function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {enabled, freeGiftsInCart, freeGiftsEligible, currentTier, tier1Diff} =
    useFreeGiftWithPurchase();

  const freeGiftAvailable = freeGiftsInCart < freeGiftsEligible[currentTier];

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      heading={LANG === 'es' ? 'Carrito' : 'Cart'}
      openFrom="right"
    >
      <div className="grid">
        <CartDetails
          layout="drawer"
          onClose={onClose}
          freeGiftEnabled={enabled}
          disableCheckout={freeGiftAvailable}
          amountToFreeGift={tier1Diff}
        />
      </div>
    </Drawer>
  );
}
