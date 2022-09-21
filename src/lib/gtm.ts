import {
  ViewedProductGTMPayload,
  RecentlyViewedProductGTMPayload,
  AddToCartGTMPayload,
} from '~/types/gtm';

export const pageViewGTMEvent = () => {
  console.log('PAGE_VIEW EVENT');
  window.dataLayer.push({event: 'pageview'});
};

export const identifyCustomerGTMEvent = (email: string) => {
  console.log('IDENTIFY_CUSTOMER EVENT');

  const gtmPayload: any = {
    $email: email,
  };

  console.log('IDENTIFY_CUSTOMER_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'identify_customer',
    identify_customer_payload: gtmPayload,
  });
};

export const viewedProductGTMEvent = (payload: ViewedProductGTMPayload) => {
  console.log('CUSTOM_VIEWED_PRODUCT_EVENT');

  const gtmPayload = {
    Brand: payload.Brand,
    CompareAtPrice: payload.CompareAtPrice,
    ImageUrl: payload.ImageUrl,
    Name: payload.ImageUrl,
    Price: payload.Price,
    ProductID: payload.ProductID,
    SKU: payload.SKU,
    ProductType: payload.ProductType,
  };
  console.log('CUSTOM_VIEWED_PRODUCT_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'viewed_product',
    viewed_product_payload: gtmPayload,
  });
};

export const recentlyViewedProductGTMEvent = (
  payload: RecentlyViewedProductGTMPayload,
) => {
  console.log('CUSTOM_RECENTLY_VIEWED_PRODUCT EVENT');

  const gtmPayload = {
    Categories: payload.Categories,
    ImageUrl: payload.ImageUrl,
    ItemId: payload.ItemId,
    Meatadata: {
      Brand: payload.Metadata.Brand,
      Price: payload.Metadata.Price,
      CompareAtPrice: payload.Metadata.CompareAtPrice,
    },
    Title: payload.Title,
    Url: payload.Url,
  };

  console.log('GTM_RECENTLY_VIEWED_PRODUCT_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'recently_viewed_product',
    recently_viewed_product_payload: gtmPayload,
  });
};

export const addToCartGTMEvent = (payload: AddToCartGTMPayload) => {
  console.log('ADD_TO_CART EVENT');

  const gtmPayload: any = {
    total_price: payload.cart.cost.totalAmount.amount,
    $value: payload.cart.cost.totalAmount.amount,
    original_total_price: payload.cart.cost.subtotalAmount.amount,
    items: payload.cart.lines,
  };

  console.log('GTM_ADD_TO_CART_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'add_to_cart',
    added_to_cart_payload: gtmPayload,
  });
};
