import {Link, useUrl, useCart, Image} from '@shopify/hydrogen';
import {useRef, useState, MouseEvent} from 'react';
import {useWindowScroll, useClickAway} from 'react-use';
import {
  Heading,
  IconAccount,
  IconBag,
  IconMenu,
  IconSearch,
  IconAccessibility,
  IconArrow,
  Input,
  IconClose,
} from '~/components';

import {CartDrawer} from './CartDrawer.client';
import {MenuDrawer} from './MenuDrawer.client';
import {useDrawer} from './Drawer.client';

import type {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';

import {Brands} from '~/data/brands';

import {MobileNav} from '../MobileNav';
/**
 * A client component that specifies the content of the header on the website
 */
export function Header({
  title,
  menu,
  brand = 'suavecito',
}: {
  title: string;
  menu?: EnhancedMenu;
  brand?: string;
}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : undefined;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;

  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();

  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu!} />
      {/* <Announcement isHome={isHome} /> */}
      <DesktopHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        brand={brand}
      />
      <MobileHeader
        countryCode={countryCode}
        isHome={isHome}
        title={title}
        menu={menu}
        openCart={openCart}
        openMenu={openMenu}
        brand={brand}
      />
    </>
  );
}

function MobileHeader({
  countryCode,
  title,
  isHome,
  openCart,
  openMenu,
  menu,
  brand,
}: {
  countryCode?: string | null;
  title: string;
  brand: string;
  isHome: boolean;
  menu?: EnhancedMenu;
  openCart: () => void;
  openMenu: () => void;
}) {
  const {y} = useWindowScroll();

  const [isMobileOpen, setMobileOpen] = useState(false);

  const fillColor = brand === 'suavecito' ? 'suave-pink' : 'suave-red';

  const styles = {
    button: 'relative flex items-center justify-center w-8 h-8',
    container: `${
      isHome
        ? 'bg-primary/80 dark:bg-contrast/60 shadow-darkHeader'
        : 'bg-contrast/80'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }flex md:hidden items-center h-nav backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 md:px-8 text-${fillColor}`,
  };

  return (
    <>
      <header role="banner" className={styles.container}>
        <Link
          className="flex items-center justify-start flex-grow w-full h-full flex-shrink-1 my-[15px]"
          to="/"
        >
          <Image
            alt={Brands[brand].alt}
            src={Brands[brand].src}
            width={Brands[brand].width}
            height={Brands[brand].height}
            className="pl-[22px]"
          />
        </Link>

        <div className="flex items-center justify-end w-full gap-2 pr-[13px]">
          <Link to={'/account'} className={styles.button}>
            <IconAccessibility fill={fillColor} />
          </Link>
          <button type="submit" className={styles.button}>
            <IconSearch fill={fillColor} />
          </button>
          <Link to={'/account'} className={styles.button}>
            <IconAccount fill={fillColor} />
          </Link>
          <button onClick={openCart} className={styles.button}>
            <IconBag fill={fillColor} />
            <CartBadge dark={isHome} />
          </button>
          <button
            onClick={(evt) => setMobileOpen(!isMobileOpen)}
            className={styles.button}
          >
            {!isMobileOpen ? <IconMenu fill={fillColor} /> : <IconClose />}
          </button>
        </div>
      </header>
      <MobileNav
        isMobileOpen={isMobileOpen}
        setMobileOpen={setMobileOpen}
        fillColor={fillColor}
        menu={menu}
      />
    </>
  );
}

function DesktopHeader({
  countryCode,
  isHome,
  menu,
  openCart,
  title,
  brand,
}: {
  countryCode?: string | null;
  isHome: boolean;
  openCart: () => void;
  menu?: EnhancedMenu;
  title: string;
  brand: string;
}) {
  const {y} = useWindowScroll();

  const [visibleSubNav, setVisibleSubNav] = useState<string>('none');
  const ref = useRef(null);

  const fillColor = brand === 'suavecita' ? 'suave-pink' : 'suave-red';

  useClickAway(ref, () => {
    setVisibleSubNav('none');
  });

  const toggleSubNav = (evt: MouseEvent, itemId: string) => {
    if (itemId !== visibleSubNav) {
      setVisibleSubNav(itemId);
    } else {
      setVisibleSubNav('none');
    }
    return true;
  };

  const styles = {
    button:
      'relative flex items-center justify-center w-8 h-8 focus:ring-primary/5',
    container: `${
      isHome
        ? 'bg-primary/80 dark:bg-contrast/60 shadow-darkHeader'
        : 'bg-contrast/80'
    } ${
      y > 50 && !isHome ? 'shadow-lightHeader ' : ''
    }hidden md:flex items-center transition duration-300 backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-8 site-header h-nav text-${fillColor}`,
  };

  return (
    <header role="banner" className={styles.container}>
      <div className="flex-shrink-0">
        <Link className={`flex-shrink-0`} to="/">
          <Image
            alt={Brands[brand].alt}
            src={Brands[brand].src}
            width={Brands[brand].width}
            height={Brands[brand].height}
          />
        </Link>
      </div>
      <nav
        className="flex gap-4 flex-wrap justify-center items-center my-[25px]"
        ref={ref}
      >
        {/* Top level menu items without subItems */}
        {(menu?.items || []).map((item) => {
          if (item.items.length === 0) {
            return (
              <Link
                className="hover:underline text-[15px]"
                key={item.id}
                to={item.to}
                target={item.target}
                onClick={(evt) => setVisibleSubNav('none')}
              >
                {item.title}
              </Link>
            );
          }
          {
            /* Top level menu items with subItems */
          }
          return (
            <div key={item.id} className="relative">
              <button
                className="hover:underline flex justify-center items-center text-[15px]"
                onClick={(evt) => toggleSubNav(evt, item.id)}
              >
                <div>
                  {item.title}
                  <span className="ml-[10px] w-[7.5px] h-[7.5px]">
                    <IconArrow direction="down" className="ml-[10px]" />
                  </span>
                </div>
              </button>
              <div
                className={`show-wrapper absolute top-[41px] bg-white py-[11px] pr-[30px] border border-solid border-color-gray-300 z-50 ${
                  item.id !== visibleSubNav ? 'hidden' : ''
                } `}
              >
                {item?.items.map((subItem) => {
                  return (
                    <div
                      key={subItem.id}
                      className="pt-[4px] px-[15px] pb-[5px]"
                    >
                      <Link
                        className="hover:underline whitespace-nowrap text-[15px]"
                        key={subItem.id}
                        to={subItem.to}
                        target={subItem.target}
                        onClick={(evt) => setVisibleSubNav('none')}
                      >
                        {subItem.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>
      <div className="flex items-center gap-2">
        <Link to={'/account'} className={styles.button}>
          <IconAccessibility fill={fillColor} />
        </Link>
        <button type="submit" className={styles.button}>
          <IconSearch fill={fillColor} />
        </button>
        <Link to={'/account'} className={styles.button}>
          <IconAccount fill={fillColor} />
        </Link>
        <button onClick={openCart} className={styles.button}>
          <IconBag fill={fillColor} />
          <CartBadge dark={isHome} />
        </button>
      </div>
    </header>
  );
}

function CartBadge({dark}: {dark: boolean}) {
  const {totalQuantity} = useCart();

  if (totalQuantity < 1) {
    return null;
  }
  return (
    <div
      className={`${
        dark
          ? 'text-primary bg-contrast dark:text-contrast dark:bg-primary'
          : 'text-contrast bg-primary'
      } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
    >
      <span>{totalQuantity}</span>
    </div>
  );
}
