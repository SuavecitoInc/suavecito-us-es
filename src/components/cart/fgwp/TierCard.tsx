import {Product} from '@shopify/hydrogen/storefront-api-types';
import {Dispatch, SetStateAction} from 'react';
import {ImLock, ImUnlocked} from 'react-icons/im';
import AddGiftButton from './AddGiftButton';
import ProductCard from './ProductCard';

const fgwp_locale: {[key: string]: any} = {
  or: {
    en: 'OR',
    es: 'O',
  },
};

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
          <div className="grid grid-cols-3 gap-4">
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

export default TierCard;
