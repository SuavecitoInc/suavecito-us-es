import {Product} from '@shopify/hydrogen/storefront-api-types';
import {Dispatch, SetStateAction} from 'react';
import {ImLock, ImUnlocked} from 'react-icons/im';

import AddGiftButton from './AddGiftButton';
import ProductCard from './ProductCard';

function SingleTierAllOptionsCard({
  lang,
  tier = 1,
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
      <div className="h-full gap-4">
        <div className="flex items-center justify-center p-4 bg-white border border-black rounded-lg grow shrink basis-auto">
          <div className="grid grid-cols-4 gap-4">
            <div className="flex items-center justify-center">
              <ProductCard
                product={products[0]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
                displayTitle={true}
              />
            </div>

            <div className="flex items-center justify-center">
              <ProductCard
                product={products[1]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
                displayTitle={true}
              />
            </div>

            <div className="flex items-center justify-center">
              <ProductCard
                product={products[2]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
                displayTitle={true}
              />
            </div>

            <div className="flex items-center justify-center">
              <ProductCard
                product={products[3]}
                inputName={`tier-${tier}-1`}
                productHandler={productHandler}
                productValue={productValue}
                tierDisabled={tierDisabled}
                displayTitle={true}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row text-center">
          <div className="mx-auto w-50">
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
    </div>
  );
}

export default SingleTierAllOptionsCard;
