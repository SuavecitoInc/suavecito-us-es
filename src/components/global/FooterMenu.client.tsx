import {Link} from '@shopify/hydrogen';
import {IconFooterAccessibility} from '~/components';
import type {EnhancedMenu, EnhancedMenuItem} from '~/lib/utils';
import {SocialMediaList, SubscribeEmail} from '../sections/footer-sections';
import {BrandTheme} from '~/types/suavecito';

export const footer_menu: {[key: string]: any} = {
  brands: {
    en: 'Brands',
    es: 'Marcas',
  },
  help: {
    en: 'Help',
    es: 'Ayuda',
  },
  newsletter: {
    title: {
      en: 'Subscribe for updates',
      es: 'Suscríbete para actualizaciones',
    },
  },
  social: {
    followUs: {
      en: 'Follow Us',
      es: 'Síganos',
    },
  },
  accessibility: {
    en: 'Suavecito is committed to providing a web experience that is accessible to all people by meeting or exceeding the requirements of the WCAG 2.0 AA. Accessibility is an ongoing effort, and we are here to help. Feel free to email us at <a href="mailto:info@suavecito.com" class="hover:underline text-suave-red hover:text-suave-red-focus ">info@suavecito.com</a> or chat with us live for assistance.',
    es: 'Suavecito se compromete a brindar una experiencia web que sea accesible para todas las personas al cumplir o superar los requisitos de las WCAG 2.0 AA. La accesibilidad es un esfuerzo continuo y estamos aquí para ayudar. No dude en enviarnos un correo electrónico a <a href="mailto:info@suavecito.com" class="hover:underline text-suave-red hover:text-suave-red-focus ">info@suavecito.com</a> o chatee con nosotros en vivo para obtener ayuda.',
  },
};

/**
 * A server component that specifies the content of the footer on the website
 */
export function FooterMenu({
  lang = 'en',
  menu,
  menu2,
  theme = 'suavecito',
}: {
  lang?: 'en' | 'es';
  menu?: EnhancedMenu;
  menu2?: EnhancedMenu;
  theme?: BrandTheme;
}) {
  const fillColor = theme === 'suavecita' ? 'suave-pink' : 'suave-red';
  const mainColor = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  const footerBackground = {
    suavecito: 'bg-[#c9c9c9]',
    suavecita: 'bg-[#000000]',
  };
  const textColor = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
  };
  const textHoverColor = {
    suavecito: 'hover:text-suave-red-focus',
    suavecita: 'hover:text-suave-pink-focus',
  };
  const pColor = {
    suavecito: '',
    suavecita: 'text-white',
  };
  const styles = {
    section: `leading-[1.5] pt-[45px] pb-[55px] ${footerBackground[mainColor]}`,
    nav: 'flex page-width sm-max:flex-col',
    div: 'flex flex-1',
    ul: 'flex-1',
    li: `pr-[30px] pb-[5px] text-[15px] uppercase hover:underline ${textColor[mainColor]} ${textHoverColor[mainColor]}`,
    listHeader: `uppercase font-bold h6 mb-[5px] ${pColor[mainColor]}`,
  };

  return (
    <section className={styles.section}>
      <nav>
        <section className={styles.nav}>
          <div className={styles.div}>
            <ul className={styles.ul}>
              <p className={styles.listHeader}>{footer_menu.brands[lang]}</p>
              {(menu?.items || []).map((item: EnhancedMenuItem) => (
                <li key={item.id} className={styles.li}>
                  <Link to={item.to} target={item.target}>
                    {item.title}
                  </Link>
                </li>
              ))}{' '}
            </ul>
            <ul className={styles.ul}>
              <p className={styles.listHeader}>{footer_menu.help[lang]}</p>
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
              <p className={styles.listHeader}>
                {footer_menu.newsletter.title[lang]}
              </p>
              <SubscribeEmail lang={lang} theme={theme} />
            </div>
            <div className="sm-min:ml-auto sm-min:w-[80%]">
              <p className={styles.listHeader}>
                {footer_menu.social.followUs[lang]}
              </p>
              <SocialMediaList theme={theme} />
            </div>
          </div>
        </section>
        <section className={styles.nav}>
          <div className={styles.div}>
            <div className="flex items-center">
              <IconFooterAccessibility
                width={'w-[50px]'}
                height={'h-[50px]'}
                theme={mainColor}
              />
            </div>
            <p
              className={`text-justify p-4 text-[15px] ${pColor[mainColor]}`}
              dangerouslySetInnerHTML={{
                __html: footer_menu.accessibility[lang],
              }}
            />
          </div>
          <div
            className={`${styles.div} justify-end items-end ${pColor[mainColor]}`}
          >
            <p>© {new Date().getFullYear()} Suavecito, Inc.</p>
          </div>
        </section>
      </nav>
    </section>
  );
}
