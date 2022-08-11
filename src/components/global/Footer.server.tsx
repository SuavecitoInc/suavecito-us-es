import {Section, FooterMenu} from '~/components';
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
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  return (
    <Section as="footer" role="contentinfo" className="!p-0">
      <FooterMenu lang={LANG} menu={menu} menu2={menu2} theme={theme} />
    </Section>
  );
}
