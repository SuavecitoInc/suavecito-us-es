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

  useEffect(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);

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
    <div className={`${!isMobileOpen ? 'hidden' : ''}`}>
      <Transition
        className={`md:hidden ${themeText[theme!]}`}
        style={{
          minHeight: `${height}px`,
        }}
        show={isMobileOpen}
        enter="transform transition-all ease-in-out duration-300"
        // enterFrom="-translate-y-full opacity-0"
        enterFrom={`-translate-y-[${height}px] opacity-0`}
        enterTo="translate-y-0 opacity-100"
        leave="transform transition-all ease-in-out duration-300"
        leaveFrom="translate-y-0 opacity-100"
        // leaveTo="-translate-y-full opacity-0"
        leaveTo={`-translate-y-[${height}px] opacity-0`}
      >
        <Transition show={currentSubCollection !== null ? false : true}>
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
          enter="transform transition-all ease-in-out duration-300"
          enterFrom="-translate-x-full opacity-0"
          enterTo="translate-x-0 opacity-100 max-h-fit"
          leave="transform transition-all ease-in-out duration-300"
          leaveFrom="translate-x-0 opacity-100 max-h-fit"
          leaveTo="-translate-x-full opacity-0"
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
