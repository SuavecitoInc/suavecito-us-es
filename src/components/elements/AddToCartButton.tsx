import {useEffect, useState, ReactNode} from 'react';
import {AddToCartButton as ButtonAddToCart, useCart} from '@shopify/hydrogen';
import {Button, Spinner} from '~/components';

export function AddToCartButton({
  variantId,
  quantity,
  accessibleAddingToCartLabel,
  disabled,
  className,
  width,
  variant,
  as,
  children,
}: {
  variantId: string | null | undefined;
  quantity: number | undefined;
  accessibleAddingToCartLabel: string | undefined;
  disabled: boolean | undefined;
  className: string | undefined;
  width: any;
  variant: any;
  as: any;
  children?: ReactNode;
}) {
  const {status} = useCart();

  const [addingToCart, setAddingToCart] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'idle' && addingToCart) {
      setAddingToCart(false);
      setLoading(false);
    }
  }, [addingToCart, status]);

  const handleAddToCart = () => {
    setLoading(true);
    setAddingToCart(true);
  };

  return (
    <>
      <ButtonAddToCart
        variantId={variantId}
        quantity={quantity}
        accessibleAddingToCartLabel={accessibleAddingToCartLabel}
        disabled={disabled}
        className={`${className} h-[64px] md:h-[64px] lg:h-[40px]`}
        onClick={() => handleAddToCart()}
      >
        {loading ? (
          <Button
            width={width}
            variant={variant}
            as={as}
            className="h-full text-center"
          >
            <Spinner />
          </Button>
        ) : (
          <Button width="full" variant={variant} as={as}>
            {children}
          </Button>
        )}
      </ButtonAddToCart>
    </>
  );
}
