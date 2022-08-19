import {SetStateAction, Dispatch} from 'react';
import {Image} from '@shopify/hydrogen';
import {ImLock, ImUnlocked} from 'react-icons/im';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

import {Button, Heading, Section} from '~/components';

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
  buttons: {
    add: {
      en: 'Add free Gift',
      es: 'Agregar regalo gratis',
    },
    spend: {
      en: 'Spend',
      es: 'Gaste',
    },
    left_to_unlock: {
      en: 'to unlock gift',
      es: 'para obtener el regalo',
    },
    added: {
      en: 'Gift Added',
      es: 'Regalo añadido',
    },
  },
  or: {
    en: 'OR',
    es: 'O',
  },
};

export function CartFreeGiftWithPurchase({
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
}: {
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
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const tierDiff: {[key: number]: number} = {
    0: tier1Diff,
    1: tier2Diff,
    2: tier3Diff,
  };

  const freeGiftAvailable = freeGiftsInCart < freeGiftsEligible[currentTier];

  return (
    <Section className="fgwp bg-[#ccc] py-[35px]">
      <Heading
        format
        as="h3"
        size="heading"
        className="text-center w-full max-w-full"
      >
        {fgwp_locale.title[LANG]}
      </Heading>
      <div className="my-4">
        <p className="text-center">
          {fgwp_locale.sub_title.first[LANG]}{' '}
          <span className="text-suave-red">
            ${`${currentTier === 3 ? '0' : tierDiff[currentTier]}`}{' '}
          </span>{' '}
          {fgwp_locale.sub_title.second[LANG]}
        </p>
        <p className="text-center">{fgwp_locale.select_your_gift[LANG]}:</p>
      </div>
      <section className="cards max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TierCard
          lang={LANG}
          products={tier1Products}
          tier={1}
          currentTier={currentTier}
          productHandler={setTier1Value}
          productValue={tier1Value}
          tierDiff={tier1Diff}
          tierDisabled={
            freeGiftAvailable && currentTier >= 1 && freeGiftsInCart !== 1
              ? false
              : true
          }
          addFreeGiftToCart={addFreeGiftToCart}
          freeGiftAvailable={freeGiftAvailable}
        />
        <TierCard
          lang={LANG}
          products={tier2Products}
          tier={2}
          currentTier={currentTier}
          productHandler={setTier2Value}
          productValue={tier2Value}
          tierDiff={tier2Diff}
          tierDisabled={
            freeGiftAvailable && currentTier >= 2 && freeGiftsInCart !== 1
              ? false
              : true
          }
          addFreeGiftToCart={addFreeGiftToCart}
          freeGiftAvailable={freeGiftAvailable}
        />
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
          tierDisabled={freeGiftAvailable && currentTier >= 3 ? false : true}
          addFreeGiftToCart={addFreeGiftToCart}
          freeGiftAvailable={freeGiftAvailable}
        />
      </section>
    </Section>
  );
}

function ProductCard({
  product,
  inputName,
  productHandler,
  productValue,
  tierDisabled,
  displayTitle = true,
}: {
  product: Product;
  inputName: string;
  productHandler: Dispatch<SetStateAction<string>>;
  productValue: string;
  tierDisabled: boolean;
  displayTitle?: boolean;
}) {
  const variant = product.variants.nodes[0];
  const cardDisabled = tierDisabled || !variant.availableForSale ? true : false;

  return (
    <div
      className={`product-card ${cardDisabled ? 'opacity-30' : 'opacity-100'}`}
    >
      <label className="radio-container">
        <Image
          width={112}
          height={112}
          widths={[112]}
          data={variant.image as ImageType}
          loaderOptions={{
            scale: 2,
            crop: 'center',
          }}
          className="object-cover object-center w-24 h-24 rounded md:w-28 md:h-28"
        />
        {displayTitle && (
          <p className="uppercase font-bold text-suave-red">{product.title}</p>
        )}

        <input
          type="radio"
          name={inputName}
          value={variant.id}
          checked={variant.id === productValue ? true : false}
          onChange={(e) => productHandler(e.target.value)}
          disabled={cardDisabled}
        />
        <span className="checkmark"></span>
      </label>
    </div>
  );
}

function AddGiftButton({
  lang,
  freeGiftAvailable,
  addFreeGiftToCart,
  currentTier,
  tier,
  tierDiff,
  tierDisabled,
}: {
  lang: 'EN' | 'ES';
  freeGiftAvailable: boolean;
  addFreeGiftToCart: (tierSelected: number) => void;
  currentTier: number;
  tier: number;
  tierDiff: number;
  tierDisabled: boolean;
}) {
  // const enabled = freeGiftAvailable && currentTier > 0 ? true : false;
  const giftAdded = !freeGiftAvailable && currentTier > 0 ? true : false;

  if (giftAdded)
    return <Button disabled={true}>{fgwp_locale.buttons.added[lang]}</Button>;

  return (
    <>
      <p>
        {`${fgwp_locale.buttons.spend[lang]} $${tierDiff} ${fgwp_locale.buttons.left_to_unlock[lang]}`}
      </p>
      <Button
        type="button"
        disabled={tierDisabled}
        variant={tierDisabled ? 'secondary' : 'suavecito'}
        onClick={() => addFreeGiftToCart(tier)}
        className="w-1/2 lg:w-full text-center"
      >
        {!tierDisabled ? (
          fgwp_locale.buttons.add[lang]
        ) : (
          <ImLock className="h-5 w-5 mx-auto text-center" />
        )}
      </Button>
    </>
  );
}

function TierCard({
  lang,
  tier,
  currentTier,
  products,
  productValue,
  productHandler,
  tierDiff,
  tierDisabled,
  addFreeGiftToCart,
  freeGiftAvailable,
}: {
  lang: 'EN' | 'ES';
  tier: number;
  currentTier: number;
  products: Product[];
  productValue: string;
  productHandler: Dispatch<SetStateAction<string>>;
  tierDiff: number;
  tierDisabled: boolean;
  addFreeGiftToCart: (tierSelected: number) => void;
  freeGiftAvailable: boolean;
}) {
  return (
    <div className={`relative ${tierDisabled ? 'opacity-30' : 'opacity-100'}`}>
      <div className="absolute top-2 left-2 z-10">
        {tierDisabled ? (
          <ImLock className="h-5 w-5" />
        ) : (
          <ImUnlocked className="h-5 w-5 opacity-25" />
        )}
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center items-center border border-black rounded-lg p-4 grow shrink basis-auto bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="uppercase font-bold">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[1]}
                inputName={`tier-${tier}`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
              />
            </div>
          </div>
        </div>

        <div className="w-full text-center">
          <AddGiftButton
            lang={lang}
            freeGiftAvailable={freeGiftAvailable}
            addFreeGiftToCart={addFreeGiftToCart}
            currentTier={currentTier}
            tier={tier}
            tierDiff={tierDiff}
            tierDisabled={tierDisabled}
          />
        </div>
      </div>
    </div>
  );
}

function Tier3Card({
  lang,
  tier = 3,
  currentTier,
  products,
  productValue1,
  productValue2,
  productHandler1,
  productHandler2,
  tierDiff,
  tierDisabled,
  addFreeGiftToCart,
  freeGiftAvailable,
}: {
  lang: 'EN' | 'ES';
  tier: number;
  currentTier: number;
  products: Product[];
  productValue1: string;
  productValue2: string;
  productHandler1: Dispatch<SetStateAction<string>>;
  productHandler2: Dispatch<SetStateAction<string>>;
  tierDiff: number;
  tierDisabled: boolean;
  addFreeGiftToCart: (tierSelected: number) => void;
  freeGiftAvailable: boolean;
}) {
  return (
    <div className={`relative ${tierDisabled ? 'opacity-30' : 'opacity-100'}`}>
      <div className="absolute top-2 left-2 z-10">
        {tierDisabled ? (
          <ImLock className="h-5 w-5" />
        ) : (
          <ImUnlocked className="h-5 w-5 opacity-25" />
        )}
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center items-center border border-black rounded-lg p-4 grow shrink basis-auto bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler1}
                productValue={productValue1}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="uppercase font-bold">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[1]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler1}
                productValue={productValue1}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>

            <div className="flex justify-center items-center">
              <ProductCard
                product={products[2]}
                inputName={`tier-${tier}-2`}
                productHandler={productHandler2}
                productValue={productValue2}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>
            <div className="flex justify-center items-center">
              <p className="uppercase font-bold">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[3]}
                inputName={`tier-${tier}-2`}
                productHandler={productHandler2}
                productValue={productValue2}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>
          </div>
        </div>

        <div className="w-full text-center">
          <AddGiftButton
            lang={lang}
            freeGiftAvailable={freeGiftAvailable}
            addFreeGiftToCart={addFreeGiftToCart}
            currentTier={currentTier}
            tier={tier}
            tierDiff={tierDiff}
            tierDisabled={tierDisabled}
          />
        </div>
      </div>
    </div>
  );
}
