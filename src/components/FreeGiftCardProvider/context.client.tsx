import {createContext, SetStateAction} from 'react';
import type {DefaultFreeGiftCardContext} from './types';
import {
  FGCWP_TIER_1_MIN,
  FGCWP_TIER_2_MIN,
  FGCWP_ENABLED,
} from '~/data/free-gift-card-with-purchase';

const defaultContext: DefaultFreeGiftCardContext = {
  enabled: FGCWP_ENABLED,
  currentTier: 0,
  setCurrentTier: (value: SetStateAction<number>) => {},
  freeGiftCardsInCart: 0,
  addFreeGiftCardToCart: (tierSelected: SetStateAction<number>) => {},
  tier1Min: FGCWP_TIER_1_MIN,
  tier2Min: FGCWP_TIER_2_MIN,
};

export const FreeGiftCardContext =
  createContext<DefaultFreeGiftCardContext>(defaultContext);
