import {useEffect, useState, useMemo} from 'react';
import {useCart} from '@shopify/hydrogen';
import {useFreeGiftWithPurchase} from '../FreeGiftProvider/hooks.client';

export function FreeGiftWithPurchaseProgressBar() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {enabled, tier1Min, tier2Min, tier3Min} = useFreeGiftWithPurchase();

  const labels: {[key: string]: any} = {
    free_gift: {
      en: 'FREE<br />GIFT!',
      es: '¡REGALO<br />GRATIS!',
    },
    free_gifts: {
      en: 'TWO FREE<br />GIFTS!',
      es: '¡DOS REGALOS<br />GRATIS!',
    },
    message: {
      you_are_only: {
        en: 'You are only',
        es: '¡Estás solo a',
      },
      from_getting_a_free_gift: {
        en: 'from getting a Free Gift!',
        es: 'de recibir un regalo gratis!',
      },
      please_add_gift_to_cart: {
        en: 'Please add your Free Gifts in cart',
        es: 'Agregue sus regalos gratis en el carrito',
      },
    },
  };

  const settings = useMemo(() => {
    return {
      tier_1_label: labels.free_gift[LANG],
      tier_2_label: labels.free_gift[LANG],
      tier_3_label: labels.free_gifts[LANG],
      fgwp_tier_1_min: tier1Min,
      fgwp_tier_2_min: tier2Min,
      fgwp_tier_3_min: tier3Min,
    };
  }, []);

  const {cost} = useCart();

  const [currentTier, setCurrentTier] = useState<number>(0);
  const [difference, setDifference] = useState<number>(0);
  const [tier1Highlight, setTier1Highlight] = useState<string>('0%');
  const [tier2Highlight, setTier2Highlight] = useState<string>('0%');
  const [tier3Highlight, setTier3Highlight] = useState<string>('0%');

  useEffect(() => {
    if (cost) {
      const total = parseFloat(cost.totalAmount.amount);
      if (total >= settings.fgwp_tier_3_min) {
        setCurrentTier(3);
        const diff = 0;
        setDifference(Number(diff.toFixed(2)));
        setTier3Highlight('100%');
        setTier2Highlight('100%');
        setTier1Highlight('100%');
      } else if (total >= settings.fgwp_tier_2_min) {
        setCurrentTier(2);
        const diff = settings.fgwp_tier_3_min - total;
        setDifference(Number(diff.toFixed(2)));
        const percentage =
          ((total / settings.fgwp_tier_3_min) * 100 - 3).toFixed(0) + '%';
        setTier3Highlight(percentage);
        setTier2Highlight('100%');
        setTier1Highlight('100%');
      } else if (total >= settings.fgwp_tier_1_min) {
        setCurrentTier(1);
        const diff = settings.fgwp_tier_2_min - total;
        setDifference(Number(diff.toFixed(2)));
        const percentage =
          ((total / settings.fgwp_tier_2_min) * 100 - 3).toFixed(0) + '%';
        setTier2Highlight(percentage);
        setTier1Highlight('100%');
      } else {
        setCurrentTier(0);
        const diff = settings.fgwp_tier_1_min - total;
        setDifference(Number(diff.toFixed(2)));
        const percentage =
          ((total / settings.fgwp_tier_1_min) * 100 - 3).toFixed(0) + '%';
        setTier1Highlight(percentage);
      }
    } else {
      const total = 0;
      setCurrentTier(0);
      const diff = settings.fgwp_tier_1_min - total;
      setDifference(Number(diff.toFixed(2)));
      const percentage =
        ((total / settings.fgwp_tier_1_min) * 100 - 3).toFixed(0) + '%';
      setTier1Highlight(percentage);
    }
  }, [cost, settings]);

  return (
    <section className="my-10">
      <div className="page-width">
        <div className="progress-bar-wrapper">
          <div className="grid grid-cols-4 tiers">
            <div className="flex items-end justify-end col-span-2 col-start-1 text-center">
              <span
                className="font-nexa-rust text-suave-red"
                dangerouslySetInnerHTML={{__html: settings.tier_1_label}}
              />
            </div>
            <div className="flex items-end justify-end text-center">
              <span
                className="font-nexa-rust text-suave-red"
                dangerouslySetInnerHTML={{__html: settings.tier_2_label}}
              />
            </div>
            <div className="flex items-end justify-end text-center">
              <span
                className="font-nexa-rust text-suave-red"
                dangerouslySetInnerHTML={{__html: settings.tier_3_label}}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 bars h-[15px]">
          <div className="flex items-end justify-end col-span-2 col-start-1 h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform translate-y-[45%]"></div>
          </div>
          <div className="flex items-end justify-end h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform translate-y-[45%]"></div>
          </div>
          <div className="flex items-end justify-end h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform translate-y-[45%]"></div>
          </div>
        </div>

        <div className="progress-bar h-[20px]">
          <div className="grid h-full grid-cols-4 border-2 border-black progress grid-container">
            <div className="col-span-2 col-start-1 tier-1">
              <div
                className="h-full bg-suave-yellow"
                style={{
                  width: `${tier1Highlight}`,
                }}
              ></div>
            </div>
            <div className="tier-2">
              <div
                className="h-full bg-suave-yellow"
                style={{
                  width: `${tier2Highlight}`,
                }}
              ></div>
            </div>
            <div className="tier-3">
              <div
                className="h-full bg-suave-yellow"
                style={{
                  width: `${tier3Highlight}`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 bars h-[15px]">
          <div className="flex items-end justify-end col-span-2 col-start-1 h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform -translate-y-[45%]"></div>
          </div>
          <div className="flex items-end justify-end h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform -translate-y-[45%]"></div>
          </div>
          <div className="flex items-end justify-end h-[15px]">
            <div className="border-r-2 border-black h-[15px] transform -translate-y-[45%]"></div>
          </div>
        </div>

        <div className="grid grid-cols-4 totals">
          <div className="flex items-end justify-end col-span-2 col-start-1 text-center">
            <span className="font-nexa-rust text-suave-red">
              ${settings.fgwp_tier_1_min}
            </span>
          </div>
          <div className="flex items-end justify-end text-center">
            <span className="font-nexa-rust text-suave-red">
              ${settings.fgwp_tier_2_min}
            </span>
          </div>
          <div className="flex items-end justify-end text-center">
            <span className="font-nexa-rust text-suave-red">
              ${settings.fgwp_tier_3_min}
            </span>
          </div>
        </div>

        <div className="mt-10 font-semibold text-center message">
          {currentTier === 3 ? (
            <p>{labels.message.please_add_gift_to_cart[LANG]}</p>
          ) : (
            <p>
              {labels.message.you_are_only[LANG]}{' '}
              <span className="font-bold text-suave-red">${difference}</span>{' '}
              {labels.message.from_getting_a_free_gift[LANG]}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
