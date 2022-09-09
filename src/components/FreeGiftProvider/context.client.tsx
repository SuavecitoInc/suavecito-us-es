import {createContext, SetStateAction} from 'react';
import type {DefaultFreeGiftContext} from './types';

const defaultContext: DefaultFreeGiftContext = {
  enabled: true,
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
};

export const FreeGiftContext =
  createContext<DefaultFreeGiftContext>(defaultContext);
