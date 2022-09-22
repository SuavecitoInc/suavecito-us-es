import {useEffect} from 'react';
import {ClientAnalytics, useProductOptions} from '@shopify/hydrogen';

export function ProductViewEvent({
  viewedProduct,
}: {
  viewedProduct: {
    vendor: string;
    title: string;
    handle: string;
    type: string;
    collections: string[];
  };
}) {
  const {selectedVariant} = useProductOptions();

  useEffect(() => {
    if (selectedVariant) {
      ClientAnalytics.publish('CUSTOM_VIEWED_PRODUCT', true, {
        brand: viewedProduct.vendor,
        categories: viewedProduct.collections,
        compareAtPrice: selectedVariant.compareAtPriceV2?.amount
          ? Number(selectedVariant.compareAtPriceV2?.amount)
          : null,
        imageUrl: selectedVariant.image?.url,
        name: viewedProduct.title,
        price: Number(selectedVariant.priceV2?.amount),
        productId: selectedVariant.id?.substring(
          selectedVariant.id?.lastIndexOf('/') + 1,
        ),
        sku: selectedVariant.sku,
        url: `/products/${viewedProduct.handle}`,
        productType: viewedProduct.type,
        vendor: viewedProduct.vendor,
      });
      // klaviyo recently viewed item
      ClientAnalytics.publish('CUSTOM_RECENTLY_VIEWED_PRODUCT', true, {
        categories: viewedProduct.collections,
        imageUrl: selectedVariant.image?.url,
        // itemId: selectedVariant.id,
        itemId: selectedVariant.id?.substring(
          selectedVariant.id?.lastIndexOf('/') + 1,
        ),
        metadata: {
          Brand: viewedProduct.vendor,
          Price: Number(selectedVariant.priceV2?.amount),
          CompareAtPrice: selectedVariant.compareAtPriceV2?.amount
            ? Number(selectedVariant.compareAtPriceV2?.amount)
            : null,
        },
        title: viewedProduct.title,
        url: `/products/${viewedProduct.handle}`,
      });
    }
  }, [viewedProduct, selectedVariant]);

  return null;
}
