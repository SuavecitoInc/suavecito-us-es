import {Link} from '@shopify/hydrogen';
import {IconArrow} from '~/components';
import {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';
import {useState} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Transition} from '@headlessui/react';

export function MobileNav({
  isMobileOpen,
  setMobileOpen,
  menu,
  fillColor,
}: {
  isMobileOpen: boolean;
  setMobileOpen: (b: boolean) => void;
  menu?: EnhancedMenu;
  fillColor: string;
}) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [currentSubCollection, setCurrentSubCollection] =
    useState<EnhancedMenuItem | null>(null);

  const toggleSubMenu = (item: EnhancedMenuItem) => {
    setCurrentSubCollection(item);
    setMobileOpen(false);
  };

  const untoggleSubMenu = () => {
    setMobileOpen(true);
    setCurrentSubCollection(null);
  };

  return (
    <>
      <Transition
        show={isMobileOpen}
        enter="ease-in-out duration-75"
        enterFrom="translate-y-0 opacity-0"
        enterTo="translate-y-full opacity-100"
        leave="ease-out"
        leaveFrom="translate-y-full opacity-100"
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
                    className="hover:underline text-[15px] flex justify-between"
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
      {/* <Transition
        show={currentSubCollection === null ? false : true}
        enter="ease-in-out duration-75"
        enterFrom="translate-y-0 opacity-0"
        enterTo="translate-y-full opacity-100"
        leave="ease-out"
        leaveFrom="translate-y-full opacity-100"
        leaveTo="translate-y-0 opacity-0"
      >
        {currentSubCollection &&
          currentSubCollection.items.map((subItem) => (
            <li
              key={subItem.id}
              className="px-[30px] py-[15px] text-[16px] border border-solid border-color-gray-300"
            >
              <Link
                className="hover:underline text-[15px]"
                to={subItem.to}
                target={subItem.target}
              >
                {subItem.title}
              </Link>
            </li>
          ))}
      </Transition> */}
    </>
  );
}
