import {useEffect, useState, useRef} from 'react';
import {Link} from '@shopify/hydrogen';
import {IconArrow} from '~/components';
import {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Transition} from '@headlessui/react';
import {useWindowSize, useMeasure, useSize} from 'react-use';
import useIsomorphicLayoutEffect from '~/hooks/useIsomorphicLayoutEffect';

export function MobileNav({
  isMobileOpen,
  setMobileOpen,
  menu,
  theme,
  currentSubCollection,
  setCurrentSubCollection,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
  menu?: EnhancedMenu;
  theme?: 'suavecito' | 'suavecita';
  currentSubCollection: EnhancedMenuItem | null;
  setCurrentSubCollection: (i: EnhancedMenuItem | null) => void;
}) {
  const [ref, {height}] = useMeasure();

  const toggleSubMenu = (item: EnhancedMenuItem) => {
    setCurrentSubCollection(item);
  };

  // useEffect(() => {
  //   setMobileOpen(false);
  // }, [setMobileOpen]);

  const windowSize = useWindowSize().width;

  useEffect(() => {
    if (windowSize >= 768) {
      setMobileOpen(false);
      setCurrentSubCollection(null);
    }
  }, [setCurrentSubCollection, setMobileOpen, windowSize]);

  const untoggleSubMenu = () => {
    setCurrentSubCollection(null);
  };

  const themeText: any = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
  };

  return (
    <div
      className={`relative ${!isMobileOpen ? 'hidden' : ''}`}
      style={{
        minHeight: `${height}px`,
      }}
    >
      <Transition
        className={`md:hidden ${themeText[theme!]}`}
        // appear={true}
        // show={true}
        show={isMobileOpen}
        enter="transition ease-in-out duration-150 transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in-out duration-150 transform"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
      >
        <Transition
          show={currentSubCollection !== null ? false : true}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <nav>
            <ul className="flex flex-col">
              {(menu?.items || []).map((item: EnhancedMenuItem) => {
                if (item.items.length === 0) {
                  return (
                    <li
                      key={item.id}
                      className="px-[30px] py-[15px] text-[16px] border border-solid border-color-gray-300"
                    >
                      <Link
                        className="hover:underline text-[15px]"
                        to={item.to}
                        target={item.target}
                        onClick={(evt) => setMobileOpen(false)}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                }
                return (
                  <li
                    key={item.id}
                    className="px-[30px] py-[15px] text-[16px] border border-solid border-color-gray-300"
                  >
                    <button
                      className="hover:underline text-[15px] flex justify-between w-full"
                      onClick={(evt) => toggleSubMenu(item)}
                    >
                      <span>{item.title}</span>
                      <span>
                        <IconArrow
                          direction="right"
                          theme={theme}
                          width={'w-[14px]'}
                          height={'w-[14px]'}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Transition>
        <Transition
          ref={ref}
          show={currentSubCollection === null ? false : true}
          enter="transition ease-in-out duration-300 transform absolute top-0 left-0 right-0 w-full"
          enterFrom="translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform absolute top-0 left-0 right-0 w-full"
          leaveFrom="translate-x-0"
          leaveTo="translate-x-full"
        >
          {currentSubCollection && (
            <ul className="flex flex-col">
              <li className="text-[16px] border border-solid border-color-gray-300">
                <div className="flex items-center">
                  <button
                    className="px-[21px] py-[15px] border border-solid border-color-gray-300"
                    onClick={(evt) => untoggleSubMenu()}
                  >
                    <IconArrow
                      direction="left"
                      theme={theme}
                      width={'w-[14px]'}
                      height={'w-[14px]'}
                    />
                  </button>
                  <span className="px-[18px]">
                    {currentSubCollection.title}
                  </span>
                </div>
              </li>
              {currentSubCollection.items.map((subItem) => (
                <li
                  key={subItem.id}
                  className="pl-[70px] pr-[30px] py-[15px] text-[16px] border border-solid border-color-gray-300"
                >
                  <Link
                    className="hover:underline text-[15px] flex w-full"
                    to={subItem.to}
                    target={subItem.target}
                    onClick={(evt) => setMobileOpen(false)}
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Transition>
      </Transition>
    </div>
  );
}
