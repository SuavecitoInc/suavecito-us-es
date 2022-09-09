import {useCart} from '@shopify/hydrogen';
import {useFreeGiftWithPurchase} from '../FreeGiftProvider/hooks.client';

export function Test() {
  const {
    tier1Diff,
    tier2Diff,
    tier3Diff,
    tier1Products,
    tier2Products,
    tier3Products,
    tier1Value,
    setTier1Value,
    tier2Value,
    setTier2Value,
    tier3Value1,
    setTier3Value1,
    tier3Value2,
    setTier3Value2,
    currentTier,
    freeGiftsInCart,
    addFreeGiftToCart,
    freeGiftsEligible,
  } = useFreeGiftWithPurchase();

  const {lines} = useCart();

  console.log('TEST CURRENT TIER', currentTier);
  console.log('LINES', lines);

  return <div>TEST</div>;
}
