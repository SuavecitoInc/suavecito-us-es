import {useEffect, useCallback, useMemo, ReactNode, useState} from 'react';
import {useCart} from '@shopify/hydrogen';
import type {Product, CartLine} from '@shopify/hydrogen/storefront-api-types';

import {FreeGiftCardContext} from './context.client';
import {DefaultFreeGiftCardContext} from './types';
import {
  FGCWP_TIER_1_MIN,
  FGCWP_TIER_2_MIN,
  FGCWP_ENABLED,
} from '~/data/free-gift-card-with-purchase';

export function FreeGiftCardProvider({
  freeGiftCards,
  children,
}: {
  freeGiftCards: Product[];
  children: ReactNode;
}) {
  const {cost, linesAdd, linesRemove, lines, status} = useCart();

  const [freeGiftCardsInCart, setFreeGiftCardsInCart] = useState<number>(0);

  const giftCard1 = freeGiftCards[0].variants.nodes[0];
  const giftCard2 = freeGiftCards[1].variants.nodes[0];
  const tier1FirstAvailable = giftCard1.id;
  const tier1GiftCardAmount = Number(giftCard1.priceV2.amount);
  const tier2FirstAvailable = giftCard2.id;
  const tier2GiftCardAmount = Number(giftCard2.priceV2.amount);

  const [tier1Value, setTier1Value] = useState<string>(tier1FirstAvailable);
  const [tier2Value, setTier2Value] = useState<string>(tier2FirstAvailable);

  const [currentTier, setCurrentTier] = useState<number>(0);

  const freeGiftCardsEligible: {[key: number]: number} = useMemo(() => {
    return {
      0: 0,
      1: 1,
      2: 1,
    };
  }, []);

  const [removeLineId, setRemoveLineId] = useState<string | null>(null);
  const [addGCLine, setAddGCLine] = useState<any>(null);

  const addFreeGiftCardToCart = useCallback(
    (tierSelected: number) => {
      // check if previous tier product in cart
      // if so add the new product
      let freeGiftCardLine: CartLine | undefined;
      lines.forEach((line) => {
        const findFGCWP = line.attributes.find((el) => el.key === '_fgcwp');
        if (findFGCWP) {
          freeGiftCardLine = line as CartLine;
        }
      });

      const values: {[key: number]: string[]} = {
        1: [tier1Value],
        2: [tier2Value],
      };

      const newLines: {
        merchandiseId: string;
        quantity: number;
        attributes: {key: string; value: string}[];
      }[] = [];

      let skipRemove = false;

      values[tierSelected].forEach((id: string) => {
        if (freeGiftCardLine && id === freeGiftCardLine.merchandise.id) {
          skipRemove = true;
        } else {
          newLines.push({
            merchandiseId: id,
            quantity: 1,
            attributes: [
              {
                key: '_fgcwp',
                value: 'true',
              },
            ],
          });
        }
      });

      if (newLines.length > 0) {
        setAddGCLine(newLines);
      }

      if (freeGiftCardLine && !skipRemove) {
        setRemoveLineId(freeGiftCardLine.id);
      }
    },
    [lines, tier1Value, tier2Value],
  );

  // find fgwp in cart
  useEffect(() => {
    let count = 0;
    lines.forEach((line) => {
      const findFGWP = line.attributes.find((el) => el.key === '_fgcwp');
      if (findFGWP) count += 1;
    });
    setFreeGiftCardsInCart(count);
  }, [lines]);

  // watch for status and remove id
  useEffect(() => {
    if (status === 'idle' && !addGCLine && removeLineId) {
      linesRemove([removeLineId]);
      setRemoveLineId(null);
    }
  }, [status, removeLineId, setRemoveLineId, linesRemove, addGCLine]);

  // calculate current tier
  // calculate diff
  useEffect(() => {
    if (!cost) return;
    let tier: 0 | 1 | 2 = 0;

    let removeLines = false;
    let totalAmount = 0;
    lines.forEach((line) => {
      const findFGWP = line.attributes.find((el) => el.key === '_fgcwp');
      if (findFGWP && Number(line.cost.totalAmount.amount) !== 0) {
        setRemoveLineId(line.id);
        removeLines = true;
      } else {
        totalAmount += Number(line.cost.totalAmount.amount);
      }
    });

    if (removeLines) {
      // exit so it can remove items
      return;
    }

    if (totalAmount >= FGCWP_TIER_2_MIN) {
      tier = 2;
    } else if (totalAmount >= FGCWP_TIER_1_MIN) {
      tier = 1;
    } else {
      tier = 0;
    }
    setCurrentTier(tier);
    // check for gc in cart, if not add them
    if (tier > 0) {
      addFreeGiftCardToCart(tier);
    }
  }, [
    addFreeGiftCardToCart,
    cost,
    lines,
    tier1GiftCardAmount,
    tier2GiftCardAmount,
  ]);

  // remove gc on non valid tiers
  useEffect(() => {
    if (currentTier === 0) {
      const fgcwpLine = lines.find((line) =>
        line.attributes.find((el) => el.key === '_fgcwp') ? true : false,
      );
      if (fgcwpLine) {
        const price = Number(fgcwpLine.cost.totalAmount.amount);
        if (price !== 0) {
          setRemoveLineId(fgcwpLine.id);
        }
      }
    }
  }, [currentTier, lines, tier1Value]);

  // add gc
  useEffect(() => {
    if (status === 'idle' && addGCLine && currentTier > 0) {
      linesAdd(addGCLine);
      setAddGCLine(null);
    }
  }, [status, currentTier, addGCLine, linesAdd]);

  const freeGiftCardContextValue = useMemo<DefaultFreeGiftCardContext>(() => {
    return {
      enabled: FGCWP_ENABLED,
      tier1Value,
      setTier1Value,
      tier2Value,
      setTier2Value,
      currentTier,
      setCurrentTier,
      freeGiftCardsInCart,
      addFreeGiftCardToCart,
      freeGiftCardsEligible,
      tier1Min: FGCWP_TIER_1_MIN,
      tier2Min: FGCWP_TIER_2_MIN,
    };
  }, [
    addFreeGiftCardToCart,
    currentTier,
    freeGiftCardsEligible,
    freeGiftCardsInCart,
    tier1Value,
    tier2Value,
  ]);

  return (
    <FreeGiftCardContext.Provider value={freeGiftCardContextValue}>
      {children}
    </FreeGiftCardContext.Provider>
  );
}
