import {useContext} from 'react';
import {FreeGiftContext} from './context';

export function useFreeGiftWithPurchase() {
  return useContext(FreeGiftContext);
}
