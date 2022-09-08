import {BrandTheme} from '~/types/suavecito';
import {Link} from '@shopify/hydrogen';
import {IconArrow} from '~/components';

export function ProductBanner({
  lang = 'en',
  theme = 'suavecito',
}: {
  lang?: 'en' | 'es';
  theme?: BrandTheme;
}) {
  const showBanner = true;
  const correctedTheme = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  const wrapperBackground = {
    suavecito: 'bg-suave-red',
    suavecita: 'bg-suave-pink',
  };
  const bannerTranslations = {
    saleMsg: {
      en: 'These products are on sale',
      es: 'Estos productos están en oferta',
    },
    learnMore: {
      en: 'Learn More',
      es: 'Más información',
    },
  };

  const styles = {
    outer: `${wrapperBackground[correctedTheme]} w-full z-50 p-[2px]`,
    inner: `text-white text-center font-bold py-[11px] px-[12px] md:px-[22px] uppercase`,
  };

  const linkTo = '/';

  return !showBanner ? (
    <></>
  ) : (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <span>{bannerTranslations.saleMsg[lang]}</span>
        <span className="mx-3"></span>{' '}
        <Link to={linkTo}>
          <div className="inline-flex items-center">
            <span className="mr-[8px]">
              {bannerTranslations.learnMore[lang]}
            </span>
            <IconArrow
              direction="right"
              width={'w-[15px]'}
              height={'w-[15px]'}
              defaultFill={true}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}
