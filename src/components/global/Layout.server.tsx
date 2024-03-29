import {Suspense} from 'react';
import {
  useLocalization,
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
} from '@shopify/hydrogen';
import type {Menu, Shop} from '@shopify/hydrogen/storefront-api-types';

import {Header} from '~/components';
import {
  Footer,
  AnnouncementBanner,
  ProductBanner,
} from '~/components/index.server';
import {parseMenu} from '~/lib/utils';

const HEADER_MENU_HANDLE = 'hydrogen-es-header';
const FOOTER_MENU_HANDLE = 'hydrogen-es-footer-brands';
const FOOTER_MENU_HANDLE_2 = 'hydrogen-es-footer-help';

const SHOP_NAME_FALLBACK = 'Hydrogen';

import {BrandTheme} from '~/types/suavecito';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */

export function Layout({
  children,
  theme = 'suavecito',
  showTopPadding = true,
  backgroundColorClass = 'bg-transparent',
  isProduct = false,
}: {
  children: React.ReactNode;
  theme?: BrandTheme;
  showTopPadding?: boolean;
  backgroundColorClass?: string;
  isProduct?: boolean;
}) {
  const {pathname} = useUrl();
  const isHome = pathname === '/';
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  return (
    <div className={`${theme === 'premium blends' ? 'bg-black' : 'bg-white'}`}>
      <div className={`flex flex-col min-h-screen ${backgroundColorClass}`}>
        <div className="">
          <a href="#mainContent" className="sr-only">
            Skip to content
          </a>
        </div>
        <Suspense fallback={<Header title={SHOP_NAME_FALLBACK} />}>
          {isHome ? (
            <AnnouncementBanner lang={LANG} />
          ) : isProduct ? (
            <ProductBanner lang={LANG} />
          ) : (
            <></>
          )}
          <HeaderWithMenu theme={theme} />
        </Suspense>
        <main
          role="main"
          id="mainContent"
          className={`flex-grow ${
            !isHome && !isHome && showTopPadding && 'pt-[35px] md:pt-[55px]'
          }`}
        >
          {children}
        </main>
      </div>
      <Suspense fallback={<Footer />}>
        <FooterWithMenu theme={theme} />
      </Suspense>
    </div>
  );
}

function HeaderWithMenu({theme}: {theme: BrandTheme}) {
  const {shopName, headerMenu} = useLayoutQuery();
  return <Header title={shopName} menu={headerMenu} theme={theme} />;
}

function FooterWithMenu({theme}: {theme: BrandTheme}) {
  const {footerMenu, footerMenu2} = useLayoutQuery();
  return <Footer menu={footerMenu} menu2={footerMenu2} theme={theme} />;
}

function useLayoutQuery() {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const {data} = useShopQuery<{
    shop: Shop;
    headerMenu: Menu;
    footerMenu: Menu;
    footerMenu2: Menu;
  }>({
    query: SHOP_QUERY,
    variables: {
      language: languageCode,
      headerMenuHandle: HEADER_MENU_HANDLE,
      footerMenuHandle: FOOTER_MENU_HANDLE,
      footerMenuHandle2: FOOTER_MENU_HANDLE_2,
    },
    cache: CacheLong(),
    preload: '*',
  });

  const shopName = data ? data.shop.name : SHOP_NAME_FALLBACK;

  /*
    Modify specific links/routes (optional)
    @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
    e.g here we map:
      - /blogs/news -> /news
      - /blog/news/blog-post -> /news/blog-post
      - /collections/all -> /products
  */
  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const headerMenu = data?.headerMenu
    ? parseMenu(data.headerMenu, customPrefixes)
    : undefined;

  const footerMenu = data?.footerMenu
    ? parseMenu(data.footerMenu, customPrefixes)
    : undefined;
  const footerMenu2 = data?.footerMenu2
    ? parseMenu(data.footerMenu2, customPrefixes)
    : undefined;

  return {footerMenu, footerMenu2, headerMenu, shopName};
}

const SHOP_QUERY = gql`
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  query layoutMenus(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
    $footerMenuHandle2: String!
  ) @inContext(language: $language) {
    shop {
      name
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
    footerMenu2: menu(handle: $footerMenuHandle2) {
      id
      items {
        ...MenuItem
        items {
          ...MenuItem
        }
      }
    }
  }
`;
