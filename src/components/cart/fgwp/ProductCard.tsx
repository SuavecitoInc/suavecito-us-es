import {Dispatch, SetStateAction, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import type {Image as ImageType} from '@shopify/hydrogen/storefront-api-types';

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
  const firstAvailable = product.variants.nodes.find(
    (variant) => variant.availableForSale,
  );

  const firstAvailableVariant = firstAvailable
    ? firstAvailable
    : product.variants.nodes[0];

  const cardDisabled =
    tierDisabled || !firstAvailableVariant.availableForSale ? true : false;

  const [selected, setSelected] = useState<string>(firstAvailableVariant.id);

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
        width={120}
        height={96}
        widths={[120]}
        data={variant.image as ImageType}
        loaderOptions={{
          scale: 2,
          crop: 'center',
        }}
        className="object-contain object-center w-24 h-24 mx-auto rounded md:w-28 md:h-28"
      />
      {displayTitle && (
        <p className="text-sm font-bold text-center uppercase text-suave-red">
          {product.title}
        </p>
      )}

      {product.variants.nodes.length > 1 && (
        <select
          name="variant"
          onChange={handleVariantChange}
          className="block mx-auto mt-2"
          value={selected}
        >
          {product.variants.nodes.map((variant) => (
            <option
              key={variant.id}
              value={variant.id}
              disabled={!variant.availableForSale}
            >
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

export default ProductCard;
