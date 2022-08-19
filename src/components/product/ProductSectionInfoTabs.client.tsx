import {useState, Fragment} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Tab} from '@headlessui/react';

export function ProductSectionInfoTabs({
  lang = 'en',
  theme = 'suavecito',
  tabs,
}: {
  lang?: 'en' | 'es';
  theme?: 'suavecito' | 'suavecita';
  tabs: {title: string; content: any}[];
}) {
  const themeTabStyles = {
    suavecito: 'text-suave-red hover:text-suave-red-focus',
    suavecita: 'text-suave-pink hover:text-suave-pink-focus',
  };

  const themeSelectedTabStyles = {
    suavecito: 'bg-suave-red hover:bg-suave-red-focus',
    suavecita: 'bg-suave-pink hover:bg-suave-pink-focus',
  };

  const tabStyles = `${themeTabStyles[theme]} text-3xl font-bold uppercase py-2 px-4`;
  const selectedTabStyles = `${themeSelectedTabStyles[theme]} text-white text-3xl font-bold uppercase py-2 px-4`;

  const tabTitles: {
    [key: string]: {
      [key: string]: string;
    };
  } = {
    Features: {
      EN: 'Features',
      ES: 'Características',
    },
    Description: {
      EN: 'Description',
      ES: 'Descripción',
    },
    'Size Chart': {
      EN: 'Size Chart',
      ES: 'Carta del Tamaño',
    },
  };

  return (
    <section className="border-t border-[#cccccc] py-6">
      <Tab.Group>
        <Tab.List className="flex gap-6 justify-center items-center mb-[30px]">
          {tabs.map((tab) => (
            <Tab key={`tab-${tab.title}`} as={Fragment}>
              {({selected}: {selected: boolean}) => (
                <button className={selected ? selectedTabStyles : tabStyles}>
                  {tabTitles[tab.title][lang]}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={`panel-${tab.title}`}>
              {tab.title === 'Features' ? (
                <FeaturesTab lang={lang} content={tab.content} />
              ) : (
                <div
                  className=""
                  dangerouslySetInnerHTML={{__html: tab.content}}
                />
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}

function FeaturesTab({
  lang,
  content,
}: {
  lang: 'en' | 'es';
  content: {
    fit: string;
    material: string;
    color: string;
    logoFront: string;
    logoBack: string;
  };
}) {
  const logo = (lang: string) => {
    if (content.logoFront === 'true' && content.logoBack === 'true') {
      return lang === 'ES'
        ? 'Logotipo delantero y trasero'
        : 'Front and Back Logo';
    } else if (content.logoFront === 'true') {
      return lang === 'ES' ? 'Logotipo delantero' : 'Front Logo';
    } else if (content.logoBack === 'true') {
      return lang === 'ES' ? 'Logotipo trasero' : 'Back Logo';
    }
  };
  return (
    <ul className="list-disc list-inside">
      <li>{content.fit}</li>
      <li>{content.material}</li>
      <li>{content.color}</li>
      <li>{logo(lang)}</li>
    </ul>
  );
}
