import {SetStateAction, Dispatch, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {ImLock, ImUnlocked} from 'react-icons/im';
import type {Product} from '@shopify/hydrogen/storefront-api-types';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

import {Button, Heading, Section} from '~/components';
import {useFreeGiftWithPurchase} from '../FreeGiftProvider/';

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

export function CartFreeGiftWithPurchase() {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const {
    isSingleTier,
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
        <p className="text-center">
          {fgwp_locale.sub_title.first[LANG]}{' '}
          <span className="text-suave-red">
            ${`${currentTier === 3 ? '0' : tierDiff[currentTier]}`}{' '}
          </span>{' '}
          {fgwp_locale.sub_title.second[LANG]}
        </p>
        <p className="text-center">{fgwp_locale.select_your_gift[LANG]}:</p>
      </div>
      <section className={tierGridStyles}>
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
              freeGiftAvailable && currentTier >= 2 && freeGiftsInCart !== 1
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
            tierDisabled={freeGiftAvailable && currentTier >= 3 ? false : true}
            addFreeGiftToCart={addFreeGiftToCart}
            freeGiftAvailable={freeGiftAvailable}
          />
        )}
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

  const [selected, setSelected] = useState<string>(variant.id);

  const handleVariantChange = (evt: any) => {
    const value = evt.target.value;
    setSelected(value);
    productHandler(value);
  };

  return (
    <div
      className={`product-card ${cardDisabled ? 'opacity-30' : 'opacity-100'}`}
    >
      <Image
        width={112}
        height={112}
        widths={[112]}
        data={variant.image as ImageType}
        loaderOptions={{
          scale: 2,
          crop: 'center',
        }}
        className="object-cover object-center w-24 h-24 mx-auto rounded md:w-28 md:h-28"
      />
      {displayTitle && (
        <p className="font-bold text-center uppercase text-suave-red">
          {product.title}
        </p>
      )}

      {product.variants.nodes.length > 1 && (
        <select
          name="variant"
          onChange={handleVariantChange}
          className="block mx-auto mt-2"
        >
          {product.variants.nodes.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.title}
            </option>
          ))}
        </select>
      )}
      <label className="radio-container">
        <input
          type="radio"
          name={inputName}
          value={selected}
          checked={selected === productValue ? true : false}
          disabled={cardDisabled}
          onChange={(e) => productHandler(e.target.value)}
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
  lang: 'en' | 'es';
  freeGiftAvailable: boolean;
  addFreeGiftToCart: (tierSelected: number) => void;
  currentTier: number;
  tier: number;
  tierDiff: number;
  tierDisabled: boolean;
}) {
  const giftAdded = !freeGiftAvailable && currentTier > 0 ? true : false;

  if (giftAdded)
    return (
      <Button disabled={true} variant="secondary">
        {fgwp_locale.buttons.added[lang]}
      </Button>
    );

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
        className="w-full text-center md:w-1/2 lg:w-full"
      >
        {!tierDisabled ? (
          fgwp_locale.buttons.add[lang]
        ) : (
          <ImLock className="w-5 h-5 mx-auto text-center" />
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
  lang: 'en' | 'es';
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
      <div className="absolute z-10 top-2 left-2">
        {tierDisabled ? (
          <ImLock className="w-5 h-5" />
        ) : (
          <ImUnlocked className="w-5 h-5 opacity-25" />
        )}
      </div>
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-center p-4 bg-white border border-black rounded-lg grow shrink basis-auto">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="flex items-center justify-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-bold uppercase">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex items-center justify-center">
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
  lang: 'en' | 'es';
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
      <div className="absolute z-10 top-2 left-2">
        {tierDisabled ? (
          <ImLock className="w-5 h-5" />
        ) : (
          <ImUnlocked className="w-5 h-5 opacity-25" />
        )}
      </div>
      <div className="flex flex-col h-full gap-4">
        <div className="flex items-center justify-center p-4 bg-white border border-black rounded-lg grow shrink basis-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex items-center justify-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler1}
                productValue={productValue1}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-bold uppercase">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex items-center justify-center">
              <ProductCard
                product={products[1]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler1}
                productValue={productValue1}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>

            <div className="flex items-center justify-center">
              <ProductCard
                product={products[2]}
                inputName={`tier-${tier}-2`}
                productHandler={productHandler2}
                productValue={productValue2}
                tierDisabled={tierDisabled}
                displayTitle={false}
              />
            </div>
            <div className="flex items-center justify-center">
              <p className="font-bold uppercase">- {fgwp_locale.or[lang]} -</p>
            </div>
            <div className="flex items-center justify-center">
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
