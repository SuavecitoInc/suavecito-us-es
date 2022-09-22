import {
  IdentifyCustomerGTMPayload,
  ViewedProductGTMPayload,
  RecentlyViewedProductGTMPayload,
  AddToCartGTMPayload,
} from '~/types/gtm';

export const pageViewGTMEvent = () => {
  window.dataLayer.push({event: 'pageview'});
};

export const identifyCustomerGTMEvent = (
  payload: IdentifyCustomerGTMPayload,
) => {
  const gtmPayload: any = {
    $email: payload.email,
  };

  if (payload.firstName) gtmPayload['$first_name'] = payload.firstName;
  if (payload.lastName) gtmPayload['$last_name'] = payload.lastName;

  window.dataLayer.push({
    event: 'identify_customer',
    identify_customer_payload: gtmPayload,
  });
};

export const viewedProductGTMEvent = (payload: ViewedProductGTMPayload) => {
  const gtmPayload = {
    Brand: payload.brand,
    CompareAtPrice: payload.compareAtPrice,
    ImageUrl: payload.imageUrl,
    Name: payload.name,
    Price: payload.price,
    ProductID: payload.productId,
    SKU: payload.sku,
    ProductType: payload.productType,
  };

  window.dataLayer.push({
    event: 'viewed_product',
    viewed_product_payload: gtmPayload,
  });
};

export const recentlyViewedProductGTMEvent = (
  payload: RecentlyViewedProductGTMPayload,
) => {
  const gtmPayload = {
    Categories: payload.categories,
    ImageUrl: payload.imageUrl,
    ItemId: payload.itemId,
    Meatadata: {
      Brand: payload.metadata.brand,
      Price: payload.metadata.price,
      CompareAtPrice: payload.metadata.compareAtPrice,
    },
    Title: payload.title,
    Url: payload.url,
  };

  window.dataLayer.push({
    event: 'recently_viewed_product',
    recently_viewed_product_payload: gtmPayload,
  });
};

export const addToCartGTMEvent = (payload: AddToCartGTMPayload) => {
  const gtmPayload: any = {
    total_price: payload.cart.cost.totalAmount.amount,
    $value: payload.cart.cost.totalAmount.amount,
    original_total_price: payload.cart.cost.subtotalAmount.amount,
    items: payload.cart.lines,
    title: payload.title,
  };

  window.dataLayer.push({
    event: 'add_to_cart',
    added_to_cart_payload: gtmPayload,
  });
};
