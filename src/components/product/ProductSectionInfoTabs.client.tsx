import {Fragment} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Tab} from '@headlessui/react';
import {
  MetafieldColors,
  MetafieldFitMaterialType,
} from '~/data/apparel-metafield-translations';

export function ProductSectionInfoTabs({
  lang = 'en',
  theme = 'suavecito',
  tabs,
  sizeChartType,
}: {
  lang?: 'en' | 'es';
  theme?: 'suavecito' | 'suavecita';
  tabs: {title: string; content: any}[];
  sizeChartType: string;
}) {
  const themeTabStyles = {
    suavecito: 'text-suave-red hover:text-suave-red-focus',
    suavecita: 'text-suave-pink hover:text-suave-pink-focus',
  };

  const themeSelectedTabStyles = {
    suavecito: 'bg-suave-red hover:bg-suave-red-focus',
    suavecita: 'bg-suave-pink hover:bg-suave-pink-focus',
  };

  const tabStyles = `${themeTabStyles[theme]} text-xl font-bold uppercase py-2 px-4`;
  const selectedTabStyles = `${themeSelectedTabStyles[theme]} text-white text-xl font-bold uppercase py-2 px-4`;

  const tabTitles: {
    [key: string]: {
      [key: string]: string;
    };
  } = {
    Features: {
      en: 'Features',
      es: 'Características',
    },
    Description: {
      en: 'Description',
      es: 'Descripción',
    },
    'Size Chart': {
      en: 'Size Chart',
      es: 'Carta del Tamaño',
    },
  };
  return (
    <section className="border-t border-[#cccccc] py-6 w-full">
      <Tab.Group>
        <Tab.List className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 justify-center items-center mb-[30px]">
          {tabs.map((tab) => (
            <Tab key={`tab-${tab.title}`} as={Fragment}>
              {({selected}: {selected: boolean}) => (
                <button
                  className={`mx-auto text-center ${
                    selected ? selectedTabStyles : tabStyles
                  }`}
                >
                  {tabTitles[tab.title][lang]}
                  {/* {tab.title} */}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="w-full">
          {tabs.map((tab) => (
            <Tab.Panel key={`panel-${tab.title}`}>
              <TabContent lang={lang} tab={tab} sizeChartType={sizeChartType} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}

function TabContent({
  lang,
  tab,
  sizeChartType,
}: {
  lang: 'en' | 'es';
  tab: {title: string; content: any};
  sizeChartType: string;
}) {
  if (tab.title === 'Features') {
    return (
      <FeaturesTab
        lang={lang}
        content={tab.content}
        sizeChartType={sizeChartType}
      />
    );
  } else if (tab.title === 'Description') {
    return <div dangerouslySetInnerHTML={{__html: tab.content}} />;
  } else if (tab.title === 'Size Chart') {
    return <SizeChartTable lang={lang} sizeChartData={tab.content} />;
  } else {
    return null;
  }
}

function FeaturesTab({
  lang = 'en',
  content,
  sizeChartType,
}: {
  lang: 'en' | 'es';
  content: {
    fit: string;
    material: string;
    color: string;
    logoFront: string;
    logoBack: string;
  };
  sizeChartType: string;
}) {
  const logo = (lang: string) => {
    if (content.logoFront === 'true' && content.logoBack === 'true') {
      return lang === 'es'
        ? 'Logotipo delantero y trasero'
        : 'Front and Back Logo';
    } else if (content.logoFront === 'true') {
      return lang === 'es' ? 'Logotipo delantero' : 'Front Logo';
    } else if (content.logoBack === 'true') {
      return lang === 'es' ? 'Logotipo trasero' : 'Back Logo';
    }
  };
  const colors = (color: string) => {
    const translated = MetafieldColors[color];
    return translated[lang];
  };
  const fit = (key: string) => {
    const translated = MetafieldFitMaterialType[key].fitType;
    return translated[lang];
  };
  const material = (key: string) => {
    const translated = MetafieldFitMaterialType[key].materialType;
    return translated[lang];
  };
  return (
    <ul className="list-disc list-inside">
      {content.fit !== '' && <li>{fit(sizeChartType)}</li>}
      {content.material !== '' && <li>{material(sizeChartType)}</li>}
      {content.color !== '' && <li>{colors(content.color.toLowerCase())}</li>}
      <li>{logo(lang)}</li>
    </ul>
  );
}

function SizeChartTable({
  lang,
  sizeChartData,
}: {
  lang: 'en' | 'es';
  sizeChartData: any;
}) {
  const header = sizeChartData[0];

  return (
    <div className="block overflow-x-scroll">
      <div className="grid grid-cols-1">
        <table className="border border-black mx-auto">
          <thead>
            <tr>
              {header.map((el: any, i: number) => {
                const d = typeof el === 'string' ? el : el[lang];
                return (
                  <th
                    // eslint-disable-next-line react/no-array-index-key
                    key={`header-${i}`}
                    className={`bg-[#ccc] font-bold border border-black px-2 py-4 z-10 ${
                      i === 0
                        ? 'sticky left-0 md:relative text-left'
                        : 'text-center px-[25px]'
                    }`}
                  >
                    {d}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {sizeChartData.map((row: any[], i: number) => {
              if (i === 0) {
                return null;
              } else {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr key={`row-${i}`}>
                    {row.map((el: any, j: number) => {
                      const d = typeof el === 'string' ? el : el[lang];
                      return j === 0 ? (
                        <th
                          // eslint-disable-next-line react/no-array-index-key
                          key={`col-${j}`}
                          className={`bg-[#ccc] font-bold text-left border border-black px-2 py-4 ${
                            j === 0
                              ? 'sticky left-0 md:relative text-left z-10'
                              : 'relative'
                          }`}
                        >
                          {d}
                        </th>
                      ) : (
                        <td
                          // eslint-disable-next-line react/no-array-index-key
                          key={`col-${j}`}
                          className={`text-center border border-black ${
                            j === 0
                              ? 'sticky left-0 md:relative text-left'
                              : 'relative'
                          } ${j % 2 === 1 ? 'bg-[#f2f2f2]' : 'bg-white'}`}
                        >
                          {d}
                        </td>
                      );
                    })}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
