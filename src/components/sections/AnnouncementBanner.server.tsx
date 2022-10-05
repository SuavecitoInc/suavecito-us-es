import {BrandTheme} from '~/types/suavecito';

export function AnnouncementBanner({
  lang = 'en',
  theme = 'suavecito',
}: {
  lang?: 'en' | 'es';
  theme?: BrandTheme;
}) {
  const correctedTheme = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  const wrapperBackground = {
    suavecito: 'bg-suave-red',
    suavecita: 'bg-suave-pink',
  };
  const bannerTranslations = {
    leftMsg: {
      en: 'FREE US SHIPPING WHEN YOU SPEND $35',
      es: 'ENVÍO GRATIS A EE.UU. EN COMPRAS DE $35',
    },
    rightMsg: {
      en: 'FREE CANADA AND MEXICO SHIPPING WHEN YOU SPEND $75',
      es: 'ENVÍO GRATIS A CANADÁ Y MÉXICO EN COMPRAS $75',
    },
  };
  const styles = {
    outer: `${wrapperBackground[correctedTheme]} w-full z-50 p-[2px]`,
    inner: `text-white text-center font-bold whitespace-nowrap py-[11px] px-[12px] md:px-[22px] announcement-bar__message`,
  };

  return (
    <div className={styles.outer}>
      <div className={styles.inner}>
        <span>{bannerTranslations.leftMsg[lang]}</span>
        <span className="hide-small">{' | '}</span>
        <span className="canada mexico">
          {bannerTranslations.rightMsg[lang]}
        </span>
      </div>
    </div>
  );
}
