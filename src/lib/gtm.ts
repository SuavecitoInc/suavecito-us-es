import {
  IdentifyCustomerGTMPayload,
  ViewedProductGTMPayload,
  RecentlyViewedProductGTMPayload,
  AddToCartGTMPayload,
} from '~/types/gtm';

export const pageViewGTMEvent = () => {
  console.log('PAGE_VIEW EVENT');
  window.dataLayer.push({event: 'pageview'});
};

export const identifyCustomerGTMEvent = (
  payload: IdentifyCustomerGTMPayload,
) => {
  console.log('IDENTIFY_CUSTOMER EVENT');

  const gtmPayload: any = {
    $email: payload.email,
  };

  if (payload.firstName) gtmPayload['$first_name'] = payload.firstName;
  if (payload.lastName) gtmPayload['$last_name'] = payload.lastName;

  console.log('IDENTIFY_CUSTOMER_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'identify_customer',
    identify_customer_payload: gtmPayload,
  });
};

export const viewedProductGTMEvent = (payload: ViewedProductGTMPayload) => {
  console.log('CUSTOM_VIEWED_PRODUCT_EVENT');

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

  console.log('GTM_RECENTLY_VIEWED_PRODUCT_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'recently_viewed_product',
    recently_viewed_product_payload: gtmPayload,
  });
};

export const addToCartGTMEvent = (payload: AddToCartGTMPayload) => {
  console.log('ADD_TO_CART EVENT', payload);

  const gtmPayload: any = {
    total_price: payload.cart.cost.totalAmount.amount,
    $value: payload.cart.cost.totalAmount.amount,
    original_total_price: payload.cart.cost.subtotalAmount.amount,
    items: payload.cart.lines,
    title: payload.title,
  };

  console.log('GTM_ADD_TO_CART_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'add_to_cart',
    added_to_cart_payload: gtmPayload,
  });
};
