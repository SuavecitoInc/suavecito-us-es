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
  const {enabled, freeGiftsInCart, freeGiftsEligible, currentTier} =
    useFreeGiftWithPurchase();

  const freeGiftAvailable = freeGiftsInCart < freeGiftsEligible[currentTier];

  return (
    <Drawer open={isOpen} onClose={onClose} heading="Cart" openFrom="right">
      <div className="grid">
        <CartDetails
          layout="drawer"
          onClose={onClose}
          disableCheckout={freeGiftAvailable}
        />
      </div>
    </Drawer>
  );
}
