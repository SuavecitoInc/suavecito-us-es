import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/hydrogen';

import {
  addToCartGTMEvent,
  identifyCustomerGTMEvent,
  pageViewGTMEvent,
  viewedProductGTMEvent,
  recentlyViewedProductGTMEvent,
  beginCheckoutGTMEvent,
} from '~/lib';

let init = false;
export function AnalyticsListener() {
  useEffect(() => {
    // Set up common page-specific data
    ClientAnalytics.pushToPageAnalyticsData({
      userLocale: navigator.language,
    });

    if (!init) {
      // One-time initialization
      init = true;
      // PAGE_VIEW
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.PAGE_VIEW,
        (_payload) => {
          pageViewGTMEvent();
        },
      );
      // CUSTOM_IDENTIFY_CUSTOMER
      ClientAnalytics.subscribe('CUSTOM_IDENTIFY_CUSTOMER', (payload) => {
        identifyCustomerGTMEvent(payload);
      });
      // ADD_TO_CART
      ClientAnalytics.subscribe(
        ClientAnalytics.eventNames.ADD_TO_CART,
        (payload) => {
          if (payload.cart?.buyerIdentity?.email) {
            identifyCustomerGTMEvent(payload.cart.buyerIdentity.email);
          }
          addToCartGTMEvent(payload);
        },
      );
      // CUSTOM_VIEWED_PRODUCT
      ClientAnalytics.subscribe('CUSTOM_VIEWED_PRODUCT', (payload) => {
        viewedProductGTMEvent(payload);
      });
      // CUSTOM_RECENTLY_VIEWED_PRODUCT
      ClientAnalytics.subscribe('CUSTOM_RECENTLY_VIEWED_PRODUCT', (payload) => {
        recentlyViewedProductGTMEvent(payload);
      });
      // CUSTOM_BEGIN_CHECKOUT
      ClientAnalytics.subscribe('CUSTOM_BEGIN_CHECKOUT', (payload) => {
        beginCheckoutGTMEvent(payload);
      });
    }
  });

  return null;
}
