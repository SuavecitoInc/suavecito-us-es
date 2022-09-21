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
        Brand: viewedProduct.vendor,
        Categories: viewedProduct.collections,
        CompareAtPrice: selectedVariant.compareAtPriceV2?.amount
          ? Number(selectedVariant.compareAtPriceV2?.amount)
          : null,
        ImageUrl: selectedVariant.image?.url,
        Name: viewedProduct.title,
        Price: Number(selectedVariant.priceV2?.amount),
        ProductID: selectedVariant.id,
        SKU: selectedVariant.sku,
        Url: `/products/${viewedProduct.handle}`,
        ProductType: viewedProduct.type,
      });
      // klaviyo recently viewed item
      ClientAnalytics.publish('CUSTOM_RECENTLY_VIEWED_PRODUCT', true, {
        Categories: viewedProduct.collections,
        ImageUrl: selectedVariant.image?.url,
        ItemId: selectedVariant.id,
        Metadata: {
          Brand: viewedProduct.vendor,
          Price: Number(selectedVariant.priceV2?.amount),
          CompareAtPrice: selectedVariant.compareAtPriceV2?.amount
            ? Number(selectedVariant.compareAtPriceV2?.amount)
            : null,
        },
        Title: viewedProduct.title,
        Url: `/products/${viewedProduct.handle}`,
      });
    }
  }, [viewedProduct, selectedVariant]);

  return null;
}
