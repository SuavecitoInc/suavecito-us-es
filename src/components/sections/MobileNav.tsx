import {Link} from '@shopify/hydrogen';
import {IconArrow} from '~/components';
import {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';
import {useEffect, useState} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Transition} from '@headlessui/react';
import {useWindowSize} from 'react-use';

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
        className={'md:hidden ' + themeText[theme!]}
        show={isMobileOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
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
          show={currentSubCollection === null ? false : true}
          enter="transform transition ease-in-out duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in-out duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
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
