import type {Dispatch, SetStateAction} from 'react';
import type {Product} from '@shopify/hydrogen/storefront-api-types';

export interface DefaultFreeGiftContext {
  enabled: boolean;
  tier1Diff: number;
  tier2Diff: number;
  tier3Diff: number;
  tier1Products: Product[];
  tier2Products: Product[];
  tier3Products: Product[];
  tier1Value: string;
  setTier1Value: Dispatch<SetStateAction<string>>;
  tier2Value: string;
  setTier2Value: Dispatch<SetStateAction<string>>;
  tier3Value1: string;
  setTier3Value1: Dispatch<SetStateAction<string>>;
  tier3Value2: string;
  setTier3Value2: Dispatch<SetStateAction<string>>;
  currentTier: number;
  setCurrentTier: Dispatch<SetStateAction<number>>;
  freeGiftsInCart: number;
  addFreeGiftToCart: (tierSelected: number) => void;
  freeGiftsEligible: {[key: number]: number};
  tier1Min: number;
  tier2Min: number;
  tier3Min: number;
}
