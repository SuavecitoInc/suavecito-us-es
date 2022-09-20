import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/hydrogen';

import {
  addToCartGTMEvent,
  identifyCustomerGTMEvent,
  pageViewGTMEvent,
  viewedProductGTMEvent,
  recentlyViewedProductGTMEvent,
} from '~/lib';

let init = false;
export function AnalyticsListener() {
  useEffect(() => {
    // Set up common page-specific data
    ClientAnalytics.pushToPageAnalyticsData({
      userLocale: navigator.language,
    });

    if (!init) {
      console.log('ANALYTICS LISTENER INIT');
      // One-time initialization
      init = true;
      // PAGE_VIEW
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.PAGE_VIEW,
        (payload) => {
          pageViewGTMEvent();
        },
      );
      // // ADD_TO_CART
      // ClientAnalytics.subscribe(
      //   ClientAnalytics.eventNames.ADD_TO_CART,
      //   (payload) => {
      //     addToCartGTMEvent(payload);
      //   },
      // );
      // UPDATE_CART
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.UPDATE_CART,
        (payload) => {
          console.log('UPDATE_CART');
          console.log(payload);
        },
      );
      // REMOVE_FROM_CART
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.REMOVE_FROM_CART,
        (payload) => {
          console.log('REMOVE_FROM_CART');
          console.log(payload);
        },
      );
      // VIEWED_PRODUCT;
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.VIEWED_PRODUCT,
        (payload) => {
          console.log('VIEWED_PRODUCT');
          console.log(payload);
        },
      );

      // ADD_TO_CART
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.ADD_TO_CART,
        (payload) => {
          if (payload.cart.buyerIdentity.email) {
            identifyCustomerGTMEvent(payload.cart.buyerIdentity.email);
          }
          addToCartGTMEvent(payload);
        },
      );
      // CUSTOM_VIEWED_PRODUCT
      ClientAnalytics.subscribe('CUSTOM_VIEWED_PRODUCT', (payload) => {
        // console.log('CUSTOM_VIEWED_PRODUCT');
        // console.log(payload);
        viewedProductGTMEvent(payload);
      });
      // CUSTOM_RECENTLY_VIEWED_PRODUCT
      ClientAnalytics.subscribe('CUSTOM_RECENTLY_VIEWED_PRODUCT', (payload) => {
        // console.log('CUSTOM_VIEWED_PRODUCT');
        // console.log(payload);
        recentlyViewedProductGTMEvent(payload);
      });
    }
  });

  return null;
}
