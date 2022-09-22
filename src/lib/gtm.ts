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

  const gtmGA4Payload = {
    currency: 'USD',
    items: [
      {
        item_id: payload.productId,
        item_name: payload.name,
        currency: 'USD',
        item_brand: payload.vendor,
        price: payload.price,
        quantity: 1,
      },
    ],
  };
  // clear previous ecommerce object
  window.dataLayer.push({
    ecommerce: null,
  });

  window.dataLayer.push({
    event: 'viewed_product_ga4',
    ecommerce: gtmGA4Payload,
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
      Brand: payload.metadata.Brand,
      Price: payload.metadata.Price,
      CompareAtPrice: payload.metadata.CompareAtPrice,
    },
    Title: payload.title,
    Url: payload.url,
  };

  window.dataLayer.push({
    event: 'recently_viewed_product',
    recently_viewed_product_payload: gtmPayload,
  });
};

// AddToCartGTMPayload
export const addToCartGTMEvent = (payload: any) => {
  // get added to cart
  const id = payload.addedCartLines[0].merchandiseId;
  const found = payload.cart.lines.edges.find(
    (item: any) => item.node.merchandise.id === id,
  );

  const gtmPayload = {
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

  const gtmGA4Payload = {
    currency: 'USD',
    value: found.node.merchandise.priceV2.amount,
    items: [
      {
        item_id: found.node.merchandise.id,
        item_name: payload.title,
        item_brand: '',
        price: found.node.merchandise.priceV2.amount,
        // item_category: '',
        quantity: found.node.quantity,
        google_business_vertical: 'retail',
        id: found.node.merchandise.id,
      },
    ],
  };
  // clear the previous ecommerce object
  window.dataLayer.push({
    ecommerce: null,
  });

  window.dataLayer.push({
    event: 'add_to_cart_ga4',
    ecommerce: gtmGA4Payload,
  });
};
