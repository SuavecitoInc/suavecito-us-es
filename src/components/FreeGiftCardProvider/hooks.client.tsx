import {useContext} from 'react';
import {FreeGiftCardContext} from './context.client';

export function useFreeGiftCardWithPurchase() {
  return useContext(FreeGiftCardContext);
}
