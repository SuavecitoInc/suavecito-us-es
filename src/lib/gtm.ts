import {
  ViewedProductPayload,
  LineItem,
  CartLineItem,
  HydrogenAddToCartPayload,
} from '~/types/gtm';

export const pageViewGTMEvent = () => {
  console.log('PAGE_VIEW');
  window.dataLayer.push({event: 'pageview'});
};

export const identifyCustomerGTMEvent = (email: string) => {
  console.log('IDENTIFY CUSTOMER EMAIL', email);
  const gtmPayload: any = {
    $email: email,
  };

  console.log('IDENTIFY CUSTOMER PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'identify_customer',
    identify_customer_payload: gtmPayload,
  });
};

export const viewedProductGTMEvent = (payload: ViewedProductPayload) => {
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
  console.log('VIEWED_PRODUCT_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'viewed_product',
    viewed_product_payload: gtmPayload,
  });
};

export const recentlyViewedProductGTMEvent = (payload: any) => {
  const gtmPayload = {
    Categories: payload.Categories,
    ImageUrl: payload.ImageUrl,
    ItemId: payload.ItemId,
    Meatadata: {
      Brand: payload.Metadata.Brand,
      Price: payload.Metadata.Price,
      CompareAtPrice: payload.Metadata.CompareAtPrice,
    },
    Title: payload.title,
    Url: payload.Url,
  };

  window.dataLayer.push({
    event: 'recently_viewed_product',
    recently_viewed_product_payload: gtmPayload,
  });
};

export const addToCartGTMEvent = (payload: any) => {
  console.log('ADD_TO_CART');
  // console.log(payload);

  const gtmPayload: any = {
    total_price: payload.cart.cost.totalAmount.amount,
    $value: payload.cart.cost.totalAmount.amount,
    original_total_price: payload.cart.cost.subtotalAmount.amount,
    items: payload.cart.lines,
  };

  console.log('GTM_ADD_TO_CART_PAYLOAD', gtmPayload);

  window.dataLayer.push({
    event: 'add_to_cart',
    added_to_cart_payload: payload,
  });
};
