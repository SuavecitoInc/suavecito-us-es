import {Suspense} from 'react';
import renderHydrogen from '@shopify/hydrogen/entry-server';
import {
  FileRoutes,
  type HydrogenRouteProps,
  PerformanceMetrics,
  PerformanceMetricsDebug,
  Route,
  Router,
  ShopifyAnalytics,
  ShopifyProvider,
  CartProvider,
} from '@shopify/hydrogen';
import {defaultCartFragment} from '@shopify/hydrogen/components/CartProvider/cart-queries';

import {HeaderFallback, GTM, AnalyticsListener} from '~/components';
import type {CountryCode} from '@shopify/hydrogen/storefront-api-types';
import {DefaultSeo, NotFound, AppWrapper} from '~/components/index.server';

function App({request}: HydrogenRouteProps) {
  const pathname = new URL(request.normalizedUrl).pathname;
  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? (localeMatch[1] as CountryCode) : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  return (
    <Suspense fallback={<HeaderFallback isHome={isHome} />}>
      <ShopifyProvider countryCode={countryCode}>
        <CartProvider
          countryCode={countryCode}
          cartFragment={defaultCartFragment}
        >
          <Suspense>
            <DefaultSeo />
          </Suspense>
          <AppWrapper>
            <Router>
              <FileRoutes
                basePath={countryCode ? `/${countryCode}/` : undefined}
              />
              <Route path="*" page={<NotFound />} />
            </Router>
          </AppWrapper>
        </CartProvider>
        <PerformanceMetrics />
        {import.meta.env.DEV && <PerformanceMetricsDebug />}
        <ShopifyAnalytics />
        <GTM />
        <AnalyticsListener />
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);
