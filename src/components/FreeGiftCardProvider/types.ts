import type {Dispatch, SetStateAction} from 'react';

export interface DefaultFreeGiftCardContext {
  enabled: boolean;
  currentTier: number;
  setCurrentTier: Dispatch<SetStateAction<number>>;
  freeGiftCardsInCart: number;
  addFreeGiftCardToCart: (tierSelected: number) => void;
  tier1Min: number;
  tier2Min: number;
}
