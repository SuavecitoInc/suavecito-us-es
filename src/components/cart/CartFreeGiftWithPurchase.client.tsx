import {Heading, Section} from '~/components';
import {useFreeGiftWithPurchase} from '../FreeGiftProvider/';

import {SingleTierAllOptionsCard, TierCard, Tier3Card} from './fgwp';

const fgwp_locale: {[key: string]: any} = {
  title: {
    en: 'Free Gift With Purchase',
    es: 'Regalo Gratis Con Compra',
  },
  sub_title: {
    first: {
      en: 'You are',
      es: '¡Estás a',
    },
    second: {
      en: 'away from unlocking a FREE Gift!',
      es: 'de obtener un regalo GRATIS!',
    },
  },
  select_your_gift: {
    en: 'Select your gift',
    es: 'Selecciona tu regalo',
  },
  or: {
    en: 'OR',
    es: 'O',
  },
};

export function CartFreeGiftWithPurchase() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {
    isSingleTier,
    singleTierAllOptionsEnabled,
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
    // setCurrentTier,
    freeGiftsInCart,
    addFreeGiftToCart,
    freeGiftsEligible,
  } = useFreeGiftWithPurchase();

  const tierDiff: {[key: number]: number} = {
    0: tier1Diff,
    1: tier2Diff,
    2: tier3Diff,
  };

  const freeGiftAvailable = freeGiftsInCart < freeGiftsEligible[currentTier];

  const singleTierStyles = `grid grid-cols-1 gap-4 mx-auto cards max-w-7xl`;
  const multiTierStyles = `grid grid-cols-1 gap-4 mx-auto cards max-w-7xl lg:grid-cols-3`;

  const tierGridStyles = isSingleTier ? singleTierStyles : multiTierStyles;

  const tier1Available = tier1Products.find((product) =>
    product.variants.nodes.find((variant) => variant.availableForSale),
  );
  const tier1Disabled = tier1Available ? false : true;

  const tier2Available = tier2Products.find((product) =>
    product.variants.nodes.find((variant) => variant.availableForSale),
  );
  const tier2Disabled = tier2Available ? false : true;

  const tier3Available = tier3Products.find((product) =>
    product.variants.nodes.find((variant) => variant.availableForSale),
  );
  const tier3Disabled = tier3Available ? false : true;

  return (
    <Section id="fgwp" className="fgwp bg-[#ccc] py-[35px]">
      <Heading
        format
        as="h3"
        size="heading"
        className="w-full max-w-full text-center"
      >
        {fgwp_locale.title[LANG]}
      </Heading>
      <div className="my-4">
        {(isSingleTier && currentTier === 1) || currentTier === 3 ? null : (
          <p className="text-center">
            {fgwp_locale.sub_title.first[LANG]}{' '}
            <span className="text-suave-red">
              ${`${currentTier === 3 ? '0' : tierDiff[currentTier]}`}{' '}
            </span>{' '}
            {fgwp_locale.sub_title.second[LANG]}
          </p>
        )}
        <p className="text-center">{fgwp_locale.select_your_gift[LANG]}:</p>
      </div>
      <section className={tierGridStyles}>
        {singleTierAllOptionsEnabled ? (
          <SingleTierAllOptionsCard
            lang={LANG}
            products={tier3Products}
            tier={1}
            currentTier={currentTier}
            productHandler={setTier1Value}
            productValue={tier1Value}
            tierDiff={tier1Diff}
            tierDisabled={
              !tier1Disabled &&
              freeGiftAvailable &&
              currentTier >= 1 &&
              freeGiftsInCart !== 1
                ? false
                : true
            }
            addFreeGiftToCart={addFreeGiftToCart}
            freeGiftAvailable={freeGiftAvailable}
          />
        ) : (
          <TierCard
            lang={LANG}
            products={tier1Products}
            tier={1}
            currentTier={currentTier}
            productHandler={setTier1Value}
            productValue={tier1Value}
            tierDiff={tier1Diff}
            tierDisabled={
              !tier1Disabled &&
              freeGiftAvailable &&
              currentTier >= 1 &&
              freeGiftsInCart !== 1
                ? false
                : true
            }
            addFreeGiftToCart={addFreeGiftToCart}
            freeGiftAvailable={freeGiftAvailable}
          />
        )}

        {!isSingleTier && (
          <TierCard
            lang={LANG}
            products={tier2Products}
            tier={2}
            currentTier={currentTier}
            productHandler={setTier2Value}
            productValue={tier2Value}
            tierDiff={tier2Diff}
            tierDisabled={
              !tier2Disabled &&
              freeGiftAvailable &&
              currentTier >= 2 &&
              freeGiftsInCart !== 1
                ? false
                : true
            }
            addFreeGiftToCart={addFreeGiftToCart}
            freeGiftAvailable={freeGiftAvailable}
          />
        )}
        {!isSingleTier && (
          <Tier3Card
            lang={LANG}
            products={tier3Products}
            tier={3}
            currentTier={currentTier}
            productHandler1={setTier3Value1}
            productHandler2={setTier3Value2}
            productValue1={tier3Value1}
            productValue2={tier3Value2}
            tierDiff={tier3Diff}
            tierDisabled={
              !tier3Disabled && freeGiftAvailable && currentTier >= 3
                ? false
                : true
            }
            addFreeGiftToCart={addFreeGiftToCart}
            freeGiftAvailable={freeGiftAvailable}
          />
        )}
      </section>
    </Section>
  );
}
