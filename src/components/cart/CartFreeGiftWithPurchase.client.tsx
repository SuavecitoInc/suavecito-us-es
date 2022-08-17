import {SetStateAction, Dispatch} from 'react';
import {Image} from '@shopify/hydrogen';
import {ImLock, ImUnlocked} from 'react-icons/im';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

import {Button, Heading, Section} from '~/components';

const fgwp_locale: {[key: string]: any} = {
  title: {
    EN: 'Free Gift With Purchase',
    ES: 'Regalo Gratis Con Compra',
  },
  sub_title: {
    first: {
      EN: 'You are',
      ES: '¡Estás a',
    },
    second: {
      EN: 'away from unlocking a FREE Gift!',
      ES: 'de obtener un regalo GRATIS!',
    },
  },
  select_your_gift: {
    EN: 'Select your gift',
    ES: 'Selecciona tu regalo',
  },
  buttons: {
    add: {
      EN: 'Add free Gift',
      ES: 'Agregar regalo gratis',
    },
    spend: {
      EN: 'Spend',
      ES: 'Gaste',
    },
    left_to_unlock: {
      EN: 'to unlock gift',
      ES: 'para obtener el regalo',
    },
    added: {
      EN: 'Gift Added',
      ES: 'Regalo añadido',
    },
  },
  or: {
    EN: 'OR',
    ES: 'O',
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
      <section className="cards max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        <TierCard
          lang={LANG}
          products={tier1Products}
          tier={1}
          productHandler={setTier1Value}
          productValue={tier1Value}
          tierHandler={setCurrentTier}
          tierValue={currentTier}
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
          productHandler={setTier2Value}
          productValue={tier2Value}
          tierHandler={setCurrentTier}
          tierValue={currentTier}
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
          productHandler1={setTier3Value1}
          productHandler2={setTier3Value2}
          productValue1={tier3Value1}
          productValue2={tier3Value2}
          tierHandler={setCurrentTier}
          tierValue={currentTier}
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
}: {
  product: Product;
  inputName: string;
  productHandler: Dispatch<SetStateAction<string>>;
  productValue: string;
  tierDisabled: boolean;
}) {
  return (
    <div className="product-card">
      <Image
        width={112}
        height={112}
        widths={[112]}
        data={product.variants.nodes[0].image as ImageType}
        loaderOptions={{
          scale: 2,
          crop: 'center',
        }}
        className="object-cover object-center w-24 h-24 rounded md:w-28 md:h-28"
      />
      <p className="uppercase font-bold text-suave-red">{product.title}</p>
      <input
        type="radio"
        name={inputName}
        value={product.variants.nodes[0].id}
        checked={product.variants.nodes[0].id === productValue ? true : false}
        onChange={(e) => productHandler(e.target.value)}
        disabled={tierDisabled}
      />
    </div>
  );
}

function TierCard({
  lang,
  tier,
  products,
  productValue,
  productHandler,
  tierHandler,
  tierValue,
  tierDiff,
  tierDisabled,
  addFreeGiftToCart,
  freeGiftAvailable,
}: {
  lang: 'EN' | 'ES';
  tier: number;
  products: Product[];
  productValue: string;
  productHandler: Dispatch<SetStateAction<string>>;
  tierHandler: Dispatch<SetStateAction<number>>;
  tierValue: number;
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
          <ImUnlocked className="h-5 w-5" />
        )}
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center items-center border border-[#ccc] rounded-lg p-4 grow shrink basis-auto bg-white">
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
          {freeGiftAvailable ? (
            <Button
              type="button"
              disabled={tierDisabled}
              onClick={() => addFreeGiftToCart(tier)}
            >
              {tierDiff === 0
                ? `${fgwp_locale.buttons.add[lang]}`
                : `${fgwp_locale.buttons.spend[lang]} $${tierDiff} ${fgwp_locale.buttons.left_to_unlock[lang]}`}
            </Button>
          ) : (
            <Button disabled={true}>{fgwp_locale.buttons.added[lang]}</Button>
          )}
        </div>
      </div>
    </div>
  );
}

function Tier3Card({
  lang,
  tier = 3,
  products,
  productValue1,
  productValue2,
  productHandler1,
  productHandler2,
  tierHandler,
  tierValue,
  tierDiff,
  tierDisabled,
  addFreeGiftToCart,
  freeGiftAvailable,
}: {
  lang: 'EN' | 'ES';
  tier: number;
  products: Product[];
  productValue1: string;
  productValue2: string;
  productHandler1: Dispatch<SetStateAction<string>>;
  productHandler2: Dispatch<SetStateAction<string>>;
  tierHandler: Dispatch<SetStateAction<number>>;
  tierValue: number;
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
          <ImUnlocked className="h-5 w-5" />
        )}
      </div>
      <div className="flex flex-col gap-4 h-full">
        <div className="flex justify-center items-center border border-[#ccc] rounded-lg p-4 grow shrink basis-auto bg-white">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex justify-center items-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler1}
                productValue={productValue1}
                tierDisabled={tierDisabled}
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
              />
            </div>

            <div className="flex justify-center items-center">
              <ProductCard
                product={products[2]}
                inputName={`tier-${tier}-2`}
                productHandler={productHandler2}
                productValue={productValue2}
                tierDisabled={tierDisabled}
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
              />
            </div>
          </div>
        </div>

        <div className="w-full text-center">
          {freeGiftAvailable ? (
            <Button
              type="button"
              disabled={tierDisabled}
              onClick={() => addFreeGiftToCart(tier)}
            >
              {tierDiff === 0
                ? `${fgwp_locale.buttons.add[lang]}`
                : `${fgwp_locale.buttons.spend[lang]} $${tierDiff} ${fgwp_locale.buttons.left_to_unlock[lang]}`}
            </Button>
          ) : (
            <Button disabled={true}>{fgwp_locale.buttons.added[lang]}</Button>
          )}
        </div>
        {/* <div className="w-full text-center">
          {freeGiftAvailable ? (
            <>
              <p>
                {`${fgwp_locale.buttons.spend[lang]} $${tierDiff} ${fgwp_locale.buttons.left_to_unlock[lang]}`}
              </p>
              <Button
                type="button"
                disabled={tierDisabled}
                variant={tierDisabled ? 'secondary' : 'primary'}
                onClick={() => addFreeGiftToCart(tier)}
              >
                {fgwp_locale.buttons.add[lang]}
              </Button>
            </>
          ) : (
            <Button disabled={true}>{fgwp_locale.buttons.added[lang]}</Button>
          )}
        </div> */}
      </div>
    </div>
  );
}
