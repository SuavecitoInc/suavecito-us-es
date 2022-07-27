// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Disclosure} from '@headlessui/react';
import {Link} from '@shopify/hydrogen';
import {list} from 'postcss';

import {Heading, IconCaret} from '~/components';
import type {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';

import {SocialMediaList, SubscribeEmail} from '../sections/footer-sections';
/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({
  menu,
  menu2,
  theme = 'suavecito',
}: {
  menu?: EnhancedMenu;
  menu2?: EnhancedMenu;
  theme?: string;
}) {
  const fillColor = theme === 'suavecita' ? 'suave-pink' : 'suave-red';
  const styles = {
    section: 'bg-[#c9c9c9] pt-[45px] pb-[55px]',
    nav: 'flex page-width sm-max:flex-col',
    div: 'flex flex-1',
    ul: 'flex-1',
    li: 'uppercase hover:underline text-' + fillColor + '',
    listHeader: 'uppercase font-bold',
  };

  return (
    <section className={styles.section}>
      <nav>
        <section className={styles.nav}>
          <div className={styles.div}>
            <ul className={styles.ul}>
              <p className={styles.listHeader}>BRANDS</p>
              {(menu?.items || []).map((item: EnhancedMenuItem) => (
                <li key={item.id} className={styles.li}>
                  <Link to={item.to} target={item.target}>
                    {item.title}
                  </Link>
                </li>
              ))}{' '}
            </ul>
            <ul className={styles.ul}>
              <p className={styles.listHeader}>HELP</p>
              {(menu2?.items || []).map((item: EnhancedMenuItem) => (
                <li key={item.id} className={styles.li}>
                  <Link to={item.to} target={item.target}>
                    {item.title}
                  </Link>
                </li>
              ))}{' '}
            </ul>
          </div>
          <div className={`flex-col ${styles.div}`}>
            <div className="sm-min:ml-auto sm-min:w-[80%]">
              <p className={styles.listHeader}>Subscribe for updates</p>
              <SubscribeEmail />
            </div>
            <div className="sm-min:ml-auto sm-min:w-[80%]">
              <p className={styles.listHeader}>Follow us</p>
              <SocialMediaList />
            </div>
          </div>
        </section>
        <section className={styles.nav}>
          <div className={styles.div}>
            <p className="text-justify">
              Suavecito is committed to providing a web experience that is
              accessible to all people by meeting or exceeding the requirements
              of the WCAG 2.0 AA. Accessibility is an ongoing effort, and we are
              here to help. Feel free to email us at{' '}
              <a
                href="mailto:info@suavecito.com"
                className={`hover:underline text-${fillColor}`}
              >
                info@suavecito.com
              </a>{' '}
              or chat with us live for assistance.
            </p>
          </div>
          <div className={`${styles.div} justify-end items-end`}>
            <p>© {new Date().getFullYear()} Suavecito, Inc.</p>
          </div>
        </section>
      </nav>
    </section>
  );
}
