import {useEffect, useCallback, useMemo, ReactNode, useState} from 'react';
import {useCart} from '@shopify/hydrogen';
import type {Product, CartLine} from '@shopify/hydrogen/storefront-api-types';

import {FreeGiftContext} from './context.client';
import {DefaultFreeGiftContext} from './types';

export function FreeGiftProvider({
  enabled = true,
  freeGifts,
  children,
}: {
  enabled?: boolean;
  freeGifts: Product[];
  children: ReactNode;
}) {
  const {cost, linesAdd, linesRemove, lines, status} = useCart();

  const TIER_1_MIN = 55;
  const TIER_2_MIN = 65;
  const TIER_3_MIN = 75;

  const [freeGiftsInCart, setFreeGiftsInCart] = useState<number>(0);

  const [tier1Diff, setTier1Diff] = useState<number>(0);
  const [tier2Diff, setTier2Diff] = useState<number>(0);
  const [tier3Diff, setTier3Diff] = useState<number>(0);

  const tier1Products = useMemo(
    () => [freeGifts[0], freeGifts[1]],
    [freeGifts],
  );
  const tier2Products = useMemo(
    () => [freeGifts[2], freeGifts[3]],
    [freeGifts],
  );
  const tier3Products = useMemo(() => [...freeGifts], [freeGifts]);

  // get first available, if not found return first, product component will handle oos
  const getFirstAvailable = (arr: Product[]) => {
    const found = arr.find((product: Product) => {
      if (
        product.variants.nodes[0] &&
        product.variants.nodes[0].quantityAvailable
      )
        return product.variants.nodes[0].quantityAvailable > 0;
    });
    let firstAvailable = arr[0].variants.nodes[0].id;
    if (found) firstAvailable = found.variants.nodes[0].id;
    return firstAvailable;
  };

  const tier1FirstAvailable = getFirstAvailable([freeGifts[0], freeGifts[1]]);
  const tier2FirstAvailable = getFirstAvailable([freeGifts[2], freeGifts[3]]);

  const [tier1Value, setTier1Value] = useState<string>(tier1FirstAvailable);
  const [tier2Value, setTier2Value] = useState<string>(tier2FirstAvailable);
  const [tier3Value1, setTier3Value1] = useState<string>(tier1FirstAvailable);
  const [tier3Value2, setTier3Value2] = useState<string>(tier2FirstAvailable);

  const [currentTier, setCurrentTier] = useState<number>(0);

  const freeGiftsEligible: {[key: number]: number} = useMemo(() => {
    return {
      0: 0,
      1: 1,
      2: 1,
      3: 2,
    };
  }, []);

  const [removeLineId, setRemoveLineId] = useState<string | null>(null);

  // find fgwp in cart
  useEffect(() => {
    let count = 0;
    lines.forEach((line) => {
      const findFGWP = line.attributes.find((el) => el.key === '_fgwp');
      if (findFGWP) count += 1;
    });
    setFreeGiftsInCart(count);
  }, [lines]);

  // watch for status and remove id
  useEffect(() => {
    if (status === 'idle' && removeLineId) {
      linesRemove([removeLineId]);
      setRemoveLineId(null);
    }
  }, [status, removeLineId, setRemoveLineId, linesRemove]);

  // calculate current tier
  // calculate diff
  useEffect(() => {
    if (!cost) return;
    const totalAmount = Number(cost?.totalAmount.amount);
    let tier: 0 | 1 | 2 | 3 = 0;
    if (totalAmount >= TIER_3_MIN) {
      tier = 3;
    } else if (totalAmount >= TIER_2_MIN) {
      tier = 2;
    } else if (totalAmount >= TIER_1_MIN) {
      tier = 1;
    } else {
      tier = 0;
    }
    setCurrentTier(tier);
    const diff1 =
      Math.round((TIER_1_MIN - totalAmount + Number.EPSILON) * 100) / 100;
    setTier1Diff(() => (diff1 > 0 ? diff1 : 0));
    const diff2 =
      Math.round((TIER_2_MIN - totalAmount + Number.EPSILON) * 100) / 100;
    setTier2Diff(() => (diff2 > 0 ? diff2 : 0));
    const diff3 =
      Math.round((TIER_3_MIN - totalAmount + Number.EPSILON) * 100) / 100;
    setTier3Diff(() => (diff3 > 0 ? diff3 : 0));
  }, [cost]);

  // removes ineligible quantities
  useEffect(() => {
    const currentTierEligible = freeGiftsEligible[currentTier];
    if (freeGiftsInCart > currentTierEligible) {
      const fgwpLines = lines.filter((line) =>
        line.attributes.find((el) => el.key === '_fgwp') ? true : false,
      );
      if (fgwpLines) {
        const fgwpLineIds = fgwpLines.map((el) => el.id);
        const removeDiff = freeGiftsInCart - currentTierEligible;
        const removeLineIds: string[] = [];
        Array.from({length: removeDiff}, (v, i) => i).forEach(() => {
          const id = fgwpLineIds.shift();
          if (id) removeLineIds.push(id);
        });
        linesRemove(removeLineIds);
      }
    }
  }, [currentTier, freeGiftsEligible, freeGiftsInCart, lines, linesRemove]);

  const addFreeGiftToCart = useCallback(
    (tierSelected: number) => {
      // check if previous tier product in cart
      // if so add the new product
      let freeGiftLine: CartLine | undefined;
      if (tierSelected === 3) {
        lines.forEach((line) => {
          const findFGWP = line.attributes.find((el) => el.key === '_fgwp');
          if (findFGWP) {
            freeGiftLine = line as CartLine;
          }
        });
      }

      const values: {[key: number]: string[]} = {
        1: [tier1Value],
        2: [tier2Value],
        3: [tier3Value1, tier3Value2],
      };
      const newLines: {
        merchandiseId: string;
        quantity: number;
        attributes: {key: string; value: string}[];
      }[] = [];

      let skipRemove = false;

      values[tierSelected].forEach((id: string) => {
        if (freeGiftLine && id === freeGiftLine.merchandise.id) {
          skipRemove = true;
        } else {
          newLines.push({
            merchandiseId: id,
            quantity: 1,
            attributes: [
              {
                key: '_fgwp',
                value: 'true',
              },
            ],
          });
        }
      });
      linesAdd(newLines);

      if (freeGiftLine && !skipRemove) setRemoveLineId(freeGiftLine.id);
    },
    [lines, linesAdd, tier1Value, tier2Value, tier3Value1, tier3Value2],
  );

  const freeGiftContextValue = useMemo<DefaultFreeGiftContext>(() => {
    return {
      enabled,
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
      setCurrentTier,
      freeGiftsInCart,
      addFreeGiftToCart,
      freeGiftsEligible,
    };
  }, [
    enabled,
    addFreeGiftToCart,
    currentTier,
    freeGiftsEligible,
    freeGiftsInCart,
    tier1Diff,
    tier1Products,
    tier1Value,
    tier2Diff,
    tier2Products,
    tier2Value,
    tier3Diff,
    tier3Products,
    tier3Value1,
    tier3Value2,
  ]);

  return (
    <FreeGiftContext.Provider value={freeGiftContextValue}>
      {children}
    </FreeGiftContext.Provider>
  );
}
