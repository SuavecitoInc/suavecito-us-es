import {useUrl} from '@shopify/hydrogen';

import {Section, Heading, FooterMenu, CountrySelector} from '~/components';
import type {EnhancedMenu} from '~/lib/utils';

import {BrandTheme} from '~/types/suavecito';

/**
 * A server component that specifies the content of the footer on the website
 */
export function Footer({
  menu,
  menu2,
  theme,
}: {
  menu?: EnhancedMenu;
  menu2?: EnhancedMenu;
  theme?: BrandTheme;
}) {
  const {pathname} = useUrl();

  const localeMatch = /^\/([a-z]{2})(\/|$)/i.exec(pathname);
  const countryCode = localeMatch ? localeMatch[1] : null;

  const isHome = pathname === `/${countryCode ? countryCode + '/' : ''}`;
  const itemsCount = menu
    ? menu?.items?.length + 1 > 4
      ? 4
      : menu?.items?.length + 1
    : [];

  return (
    <Section as="footer" role="contentinfo" className="!p-0">
      <FooterMenu menu={menu} menu2={menu2} theme={theme} />
    </Section>
  );
}
