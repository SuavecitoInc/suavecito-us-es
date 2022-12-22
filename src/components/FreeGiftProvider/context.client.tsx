import {createContext, SetStateAction} from 'react';
import type {DefaultFreeGiftContext} from './types';
import {
  FGWP_TIER_1_MIN,
  FGWP_TIER_2_MIN,
  FGWP_TIER_3_MIN,
  FGWP_ENABLED,
  FGWP_SINGLE_TIER_ENABLED,
  FGWP_SINGLE_TIER_ALL_OPTIONS_ENABLED,
} from '~/data/free-gift-with-purchase';

const defaultContext: DefaultFreeGiftContext = {
  enabled: FGWP_ENABLED,
  isSingleTier: FGWP_SINGLE_TIER_ENABLED,
  singleTierAllOptionsEnabled:
    FGWP_SINGLE_TIER_ENABLED && FGWP_SINGLE_TIER_ALL_OPTIONS_ENABLED
      ? true
      : false,
  tier1Diff: 0,
  tier2Diff: 0,
  tier3Diff: 0,
  tier1Products: [],
  tier2Products: [],
  tier3Products: [],
  tier1Value: '',
  setTier1Value: (value: SetStateAction<string>) => {},
  tier2Value: '',
  setTier2Value: (value: SetStateAction<string>) => {},
  tier3Value1: '',
  setTier3Value1: (value: SetStateAction<string>) => {},
  tier3Value2: '',
  setTier3Value2: (value: SetStateAction<string>) => {},
  currentTier: 0,
  setCurrentTier: (value: SetStateAction<number>) => {},
  freeGiftsInCart: 0,
  addFreeGiftToCart: (tierSelected: SetStateAction<number>) => {},
  freeGiftsEligible: {0: 0, 1: 1, 2: 1, 3: 2},
  tier1Min: FGWP_TIER_1_MIN,
  tier2Min: FGWP_TIER_2_MIN,
  tier3Min: FGWP_TIER_3_MIN,
  checkoutDisabled: false,
};

export const FreeGiftContext =
  createContext<DefaultFreeGiftContext>(defaultContext);
