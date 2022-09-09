import {useContext} from 'react';
import {FreeGiftContext} from './context.client';

export function useFreeGiftWithPurchase() {
  return useContext(FreeGiftContext);
}
