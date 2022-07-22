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
  fillColor,
  currentSubCollection,
  setCurrentSubCollection,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
  menu?: EnhancedMenu;
  fillColor: string;
  currentSubCollection: EnhancedMenuItem | null;
  setCurrentSubCollection: (i: EnhancedMenuItem | null) => void;
}) {
  const toggleSubMenu = (item: EnhancedMenuItem) => {
    setCurrentSubCollection(item);
  };

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

  return (
    <>
      <Transition
        className={'md:hidden'}
        show={isMobileOpen}
        enter="ease-in"
        enterFrom="translate-y-100 opacity-0 duration-100"
        enterTo="translate-y-0 opacity-100"
        leave="ease-out"
        leaveFrom="translate-y-0 opacity-100"
        leaveTo="translate-y-100 opacity-0"
      >
        <Transition
          show={currentSubCollection !== null ? false : true}
          enter="ease-in-out"
          enterFrom="translate-y-0 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="ease-out"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-0 opacity-0"
        >
          <div>
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
                        <IconArrow direction="right" fill={fillColor} />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Transition>
        <Transition
          show={currentSubCollection === null ? false : true}
          enter="ease-in-out"
          enterFrom="translate-y-0 opacity-0"
          enterTo="translate-y-0 opacity-100"
          leave="ease-out"
          leaveFrom="translate-y-0 opacity-100"
          leaveTo="translate-y-0 opacity-0"
        >
          {currentSubCollection && (
            <ul className="flex flex-col">
              <li className="text-[16px] border border-solid border-color-gray-300">
                <div className="flex items-center">
                  <button
                    className="px-[21px] py-[15px] border border-solid border-color-gray-300"
                    onClick={(evt) => untoggleSubMenu()}
                  >
                    <IconArrow direction="left" fill={fillColor} />
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
                  >
                    {subItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Transition>
      </Transition>
    </>
  );
}
