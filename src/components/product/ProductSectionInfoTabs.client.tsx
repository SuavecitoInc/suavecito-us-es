import {useState, Fragment} from 'react';
// @ts-expect-error @headlessui/react incompatibility with node16 resolution
import {Tab} from '@headlessui/react';

export function ProductSectionInfoTabs({
  theme = 'suavecito',
  tabs,
}: {
  theme?: 'suavecito' | 'suavecita';
  tabs: {title: string; content: any}[];
}) {
  const themeTabStyles = {
    suavecito: 'text-suave-red',
    suavecita: 'text-suave-pink',
  };

  const themeSelectedTabStyles = {
    suavecito: 'bg-suave-red',
    suavecita: 'bg-suave-pink',
  };

  const tabStyles = `${themeTabStyles[theme]} text-3xl font-bold uppercase py-2 px-4`;
  const selectedTabStyles = `${themeSelectedTabStyles[theme]} text-white text-3xl font-bold uppercase py-2 px-4`;

  return (
    <section className="border-t border-[#cccccc] py-6">
      <Tab.Group>
        <Tab.List className="flex gap-6 justify-center items-center">
          {tabs.map((tab) => (
            <Tab key={`tab-${tab.title}`} as={Fragment}>
              {({selected}: {selected: boolean}) => (
                <button className={selected ? selectedTabStyles : tabStyles}>
                  {tab.title}
                </button>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          {tabs.map((tab) => (
            <Tab.Panel key={`panel-${tab.title}`}>
              {tab.title === 'Features' ? (
                <FeaturesTab content={tab.content} />
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
  content,
}: {
  content: {
    fit: string;
    material: string;
    color: string;
    logoFront: string;
    logoBack: string;
  };
}) {
  const logo = () => {
    if (content.logoFront === 'true' && content.logoBack === 'true') {
      return 'Front and Back Logo';
    } else if (content.logoFront === 'true') {
      return 'Front Logo';
    } else if (content.logoBack === 'true') {
      return 'Back Logo';
    }
  };
  return (
    <ul className="list-disc list-inside">
      <li>{content.fit}</li>
      <li>{content.material}</li>
      <li>{content.color}</li>
      <li>{logo()}</li>
    </ul>
  );
}
