import React, {useCallback} from 'react';
import {useServerProps} from '@shopify/hydrogen';
import {
  Menu,
  MenuItem,
  MoneyV2,
  UserError,
} from '@shopify/hydrogen/storefront-api-types';

// @ts-expect-error types not available
import typographicBase from 'typographic-base';

/**
 * This is a hack until we have better built-in primitives for
 * causing server components to re-render.
 *
 * @returns function when called will cause the current page to re-render on the server
 */

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;
export function useRenderServerComponents() {
  const {serverProps, setServerProps} = useServerProps();

  return useCallback(() => {
    setServerProps('renderRsc', !serverProps.renderRsc);
  }, [serverProps, setServerProps]);
}

export function missingClass(string?: string, prefix?: string) {
  if (!string) {
    return true;
  }

  const regex = new RegExp(` ?${prefix}`, 'g');
  return string.match(regex) === null;
}

export function formatText(input?: string | React.ReactNode) {
  if (!input) {
    return;
  }

  if (typeof input !== 'string') {
    return input;
  }

  return typographicBase(input, {locale: 'en-us'}).replace(
    /\s([^\s<]+)\s*$/g,
    '\u00A0$1',
  );
}

export function isNewArrival(date: string, daysOld = 30) {
  return (
    new Date(date).valueOf() >
    new Date().setDate(new Date().getDate() - daysOld).valueOf()
  );
}

export function isDiscounted(price: MoneyV2, compareAtPrice: MoneyV2) {
  if (compareAtPrice?.amount > price?.amount) {
    return true;
  }
  return false;
}

export function getExcerpt(text: string) {
  const regex = /<p.*>(.*?)<\/p>/;
  const match = regex.exec(text);
  return match?.length ? match[0] : text;
}

function resolveToFromType(
  {
    customPrefixes,
    pathname,
    type,
  }: {
    customPrefixes: Record<string, string>;
    pathname?: string;
    type?: string;
  } = {
    customPrefixes: {},
  },
) {
  if (!pathname || !type) return '';

  /*
    MenuItemType enum
    @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
  */
  const defaultPrefixes = {
    BLOG: 'blogs',
    COLLECTION: 'collections',
    COLLECTIONS: 'collections', // Collections All (not documented)
    FRONTPAGE: 'frontpage',
    HTTP: '',
    PAGE: 'pages',
    CATALOG: 'collections/all', // Products All
    PRODUCT: 'products',
    SEARCH: 'search',
    SHOP_POLICY: 'policies',
  };

  const pathParts = pathname.split('/');
  const handle = pathParts.pop() || '';
  const routePrefix: Record<string, string> = {
    ...defaultPrefixes,
    ...customPrefixes,
  };

  switch (true) {
    // special cases
    case type === 'FRONTPAGE':
      return '/';

    case type === 'ARTICLE': {
      const blogHandle = pathParts.pop();
      return routePrefix.BLOG
        ? `/${routePrefix.BLOG}/${blogHandle}/${handle}/`
        : `/${blogHandle}/${handle}/`;
    }

    case type === 'COLLECTIONS':
      return `/${routePrefix.COLLECTIONS}`;

    case type === 'SEARCH':
      return `/${routePrefix.SEARCH}`;

    case type === 'CATALOG':
      return `/${routePrefix.CATALOG}`;

    // common cases: BLOG, PAGE, COLLECTION, PRODUCT, SHOP_POLICY, HTTP
    default:
      return routePrefix[type]
        ? `/${routePrefix[type]}/${handle}`
        : `/${handle}`;
  }
}

/*
  Parse each menu link and adding, isExternal, to and target
*/
function parseItem(customPrefixes = {}) {
  return function (item: MenuItem): EnhancedMenuItem {
    if (!item?.url || !item?.type) {
      // eslint-disable-next-line no-console
      console.warn('Invalid menu item.  Must include a url and type.');
      // @ts-ignore
      return;
    }

    // extract path from url because we don't need the origin on internal to attributes
    const {pathname} = new URL(item.url);

    /*
      Currently the MenuAPI only returns online store urls e.g — xyz.myshopify.com/..
      Note: update logic when API is updated to include the active qualified domain
    */
    // const isInternalLink = /\.myshopify\.com/g.test(item.url);
    const isInternalLink = /suavecito.com/g.test(item.url);

    const parsedItem = isInternalLink
      ? // internal links
        {
          ...item,
          isExternal: false,
          target: '_self',
          to: resolveToFromType({type: item.type, customPrefixes, pathname}),
        }
      : // external links
        {
          ...item,
          isExternal: true,
          target: '_blank',
          to: item.url,
        };

    return {
      ...parsedItem,
      items: item.items?.map(parseItem(customPrefixes)),
    };
  };
}

export interface EnhancedMenuItem extends MenuItem {
  to: string;
  target: string;
  isExternal?: boolean;
  items: EnhancedMenuItem[];
}

export interface EnhancedMenu extends Menu {
  items: EnhancedMenuItem[];
}

/*
  Recursively adds `to` and `target` attributes to links based on their url
  and resource type.
  It optionally overwrites url paths based on item.type
*/
export function parseMenu(menu: Menu, customPrefixes = {}): EnhancedMenu {
  if (!menu?.items) {
    // eslint-disable-next-line no-console
    console.warn('Invalid menu passed to parseMenu');
    // @ts-ignore
    return menu;
  }

  return {
    ...menu,
    items: menu.items.map(parseItem(customPrefixes)),
  };
}

export function getApiErrorMessage(
  field: string,
  data: Record<string, any>,
  errors: UserError[],
) {
  if (errors?.length) return errors[0].message ?? errors[0];
  if (data?.[field]?.customerUserErrors?.length)
    return data[field].customerUserErrors[0].message;
  return null;
}

export function statusMessage(status: string) {
  const translations: Record<string, string> = {
    ATTEMPTED_DELIVERY:
      LANG === 'en' ? 'Attempted delivery' : 'Intento de entrega',
    CANCELED: LANG === 'en' ? 'Canceled' : 'Cancelado',
    CONFIRMED: LANG === 'en' ? 'Confirmed' : 'Confirmado',
    DELIVERED: LANG === 'en' ? 'Delivered' : 'Entregado',
    FAILURE: LANG === 'en' ? 'Failure' : 'Fallo',
    FULFILLED: LANG === 'en' ? 'Fulfilled' : 'Cumplido',
    IN_PROGRESS: LANG === 'en' ? 'In progress' : 'En curso',
    IN_TRANSIT: LANG === 'en' ? 'In transit' : 'En tránsito',
    LABEL_PRINTED: LANG === 'en' ? 'Label printed' : 'Etiqueta impresa',
    LABEL_PURCHASED: LANG === 'en' ? 'Label purchased' : 'Etiqueta comprada',
    LABEL_VOIDED: LANG === 'en' ? 'Label voided' : 'Etiqueta anulada',
    MARKED_AS_FULFILLED:
      LANG === 'en' ? 'Marked as fulfilled' : 'Marcado como cumplido',
    NOT_DELIVERED: LANG === 'en' ? 'Not delivered' : 'No entregado',
    ON_HOLD: LANG === 'en' ? 'On hold' : 'En espera',
    OPEN: LANG === 'en' ? 'Open' : 'Abierto',
    OUT_FOR_DELIVERY:
      LANG === 'en' ? 'Out for delivery' : 'En espera de la entrega',
    PARTIALLY_FULFILLED:
      LANG === 'en' ? 'Partially fulfilled' : 'Cumplido parcialmente',
    PENDING_FULFILLMENT: LANG === 'en' ? 'Pending' : 'Pendiente',
    PICKED_UP: LANG === 'en' ? 'Displayed as pickup' : 'Recogido',
    READY_FOR_PICKUP:
      LANG === 'en' ? 'Ready for pickup' : 'Listo para ser recogido',
    RESTOCKED: LANG === 'en' ? 'Restocked' : 'Reabastecido',
    SCHEDULED: LANG === 'en' ? 'Scheduled' : 'Programado',
    SUBMITTED: LANG === 'en' ? 'Submitted' : 'Enviado',
    UNFULFILLED: LANG === 'en' ? 'Unfulfilled' : 'En tránsito',
  };
  try {
    return translations?.[status];
  } catch (error) {
    return status;
  }
}

export function emailValidation(email: HTMLInputElement) {
  if (email.validity.valid) return null;

  return email.validity.valueMissing
    ? 'Please enter an email'
    : 'Please enter a valid email';
}

export function passwordValidation(password: HTMLInputElement) {
  if (password.validity.valid) return null;

  if (password.validity.valueMissing) {
    return 'Please enter a password';
  }

  return 'Password must be at least 6 characters';
}
