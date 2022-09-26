import {
  useLocalization,
  useShopQuery,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
  gql,
  type HydrogenRouteProps,
} from '@shopify/hydrogen';
import {Suspense} from 'react';

import {Text, ContactForm} from '~/components';
import {NotFound, Layout} from '~/components/index.server';

export const contactData: {[key: string]: any} = {
  title: {
    en: 'Contact Us',
    es: 'Contacto',
  },
  general: {
    en: 'General Inquiries',
    es: 'Consultas Generales',
  },
  mondayFriday: {
    en: 'Monday - Friday',
    es: 'Lunes - Viernes',
  },
  saturdaySunday: {
    en: 'Saturday - Sunday',
    es: 'Sabado - Domingo',
  },
  saturday: {
    en: 'Saturday',
    es: 'Sabado',
  },
  sunday: {
    en: 'Sunday',
    es: 'Domingo',
  },
  store: {
    en: 'HQ Store',
    es: 'Nuestra Tienda',
  },
  closed: {
    en: 'Closed',
    es: 'Cerrado',
  },
};

const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

export default function Page({
  params,
  lang = LANG,
}: {
  params: HydrogenRouteProps;
  lang?: 'en' | 'es';
}) {
  const {
    language: {isoCode: languageCode},
  } = useLocalization();

  const {handle} = params;
  const {
    data: {page},
  }: any = useShopQuery({
    query: PAGE_QUERY,
    variables: {languageCode, handle},
  });

  if (!page) {
    return <NotFound />;
  }

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.page,
      resourceId: page.id,
    },
  });

  const styles = {
    flex: 'flex gap-10 flex-col lg:flex-row',
    flexChild: 'flex-1',
    card: 'shadow-lg rounded p-[24px]',
    leftSide: 'flex flex-col gap-10',
    input:
      'border-x-0 border-t-0 w-full placeholder-gray-500 my-4 placeholder:uppercase placeholder:text-[.95rem]',
    textHeader: 'mb-[15px] text-[1.5rem]',
    textMarginBottom: 'mb-[10px]',
  };

  return (
    <Layout>
      <Suspense>
        <Seo type="page" data={page} />
      </Suspense>
      <section className="page-width">
        <h1 className="text-[2.5rem] mb-[15px]">{contactData.title[lang]}</h1>
      </section>
      <section className="page-width pb-[50px]">
        <div className={styles.flex}>
          <div className={styles.flexChild}>
            <ContactForm lang={lang} styles={styles} />
          </div>
          <div className={styles.flexChild}>
            <div className={styles.leftSide}>
              <div className={styles.card}>
                <Text className={styles.textHeader} as={'p'}>
                  {contactData.general[lang]}
                </Text>
                <Text className={styles.textMarginBottom} as={'p'}>
                  info@suavecito.com
                </Text>
                <Text className={styles.textMarginBottom} as={'p'}>
                  714.388.7920
                </Text>
                <Text
                  as={'p'}
                >{`${contactData.mondayFriday[lang]}: 8am - 5pm`}</Text>
                <Text
                  as={'p'}
                >{`${contactData.saturdaySunday[lang]}: ${contactData.closed[lang]}`}</Text>
              </div>
              <div className={styles.card}>
                <Text className={styles.textHeader} as={'p'}>
                  {contactData.store[lang]}
                </Text>
                <Text className={styles.textMarginBottom} as={'p'}>
                  714.831.1419
                </Text>
                <Text className={styles.textMarginBottom} as={'p'}>
                  2831 W 1st St, Santa Ana, CA 92703
                </Text>
                <Text
                  as={'p'}
                >{`${contactData.mondayFriday[lang]}: 8am - 7pm`}</Text>
                <Text
                  as={'p'}
                >{`${contactData.saturday[lang]}: 9am - 5pm`}</Text>
                <Text
                  as={'p'}
                >{`${contactData.sunday[lang]}: 11am - 4pm`}</Text>
                <div className="flex mt-4 max-w-[450px] max-h-[600px] w-full h-full">
                  <iframe
                    title="Suavecito HQ Location"
                    src={`https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13270.230725412206!2d-117.9077386!3d33.7462521!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xeb299300e2e1f8b5!2sSuavecito%20Pomade!5e0!3m2!1sen!2sus!4v1660860598550!5m2!1sen!2sus&language=${lang}`}
                    width="600"
                    height="450"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

const PAGE_QUERY = gql`
  query PageDetails($languageCode: LanguageCode)
  @inContext(language: $languageCode) {
    page(handle: "contact") {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
