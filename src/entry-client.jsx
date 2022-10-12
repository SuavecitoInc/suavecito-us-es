import * as Sentry from '@sentry/react';
import {BrowserTracing} from '@sentry/tracing';
import renderHydrogen from '@shopify/hydrogen/entry-client';

const ClientWrapper = ({children}) => children;

Sentry.init({
  dsn: 'https://a69eb81eb70042308b425947369066d5@o1181994.ingest.sentry.io/4503967682789376',
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 0.2,
});

export default renderHydrogen(ClientWrapper, {});
