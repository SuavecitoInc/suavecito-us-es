import {Seo} from '@shopify/hydrogen';
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-array-index-key */
import {Layout} from '~/components/index.server';
import {Media} from '@shopify/hydrogen/storefront-api-types';
import {ImageMedia} from '~/components/index';

import {pomadeBlogSettings as sections} from '~/data/pomade-blog-es';

export default function Page() {
  const data = {
    description:
      'Honestamente, no hay una respuesta perfecta a esta pregunta. Pero podemos acercarnos bastante. Todo el mundo es diferente y eso está bien. Una pomada que podría funcionar para el cabello rizado de una persona podría no funcionar para el cabello rizado de otra. Sucede. Entonces, hablemos en general sobre tipos de cabello, estilos y qué productos combinan con ellos. Entonces podemos dar algunos consejos para afinar eso en un grado más estricto.',
    title: '¿Pomada, Cera Para el Cabello, Arcilla, Gel, Pasta?',
    titleTemplate: `%s: ¿Pomada, Cera Para el Cabello, Arcilla, Gel, Pasta?`,
  };

  return (
    <Layout>
      <Seo type="page" data={data} />
      {sections.map((section: any, i: number) => {
        if (section.settings.type === 'BANNER') {
          return <Banner key={`section-${i}`} section={section} />;
        }
        if (section.settings.type === 'TWO_COLUMN') {
          return <TwoColumn key={`section-${i}`} section={section} />;
        }
        if (section.settings.type === 'ONE_COLUMN') {
          return <OneColumn key={`section-${i}`} section={section} />;
        }
      })}
    </Layout>
  );
}

function Banner({section}: {section: any}) {
  return (
    <div className="relative w-full">
      <ImageMedia
        scale={2}
        sizes={
          section.data.image?.reference
            ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
            : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
        }
        widths={
          section.data.image?.reference ? [500, 450, 700] : [500, 900, 1400]
        }
        width={section.data.image?.reference ? 375 : 750}
        data={section.data.image.reference as Media}
        loading="eager"
      />
      {section.settings.overlay.display && (
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white/[.2]`}
        ></div>
      )}

      <div
        className="absolute text-xl font-black uppercase md:text-3xl lg:text-4xl xl:text-5xl top-5 left-5 md:top-10 md:left-10"
        dangerouslySetInnerHTML={{__html: section.data.title}}
      />
    </div>
  );
}

function OneColumn({section}: {section: any}) {
  return (
    <div className="my-4">
      <div className="page-width">
        <h2 className="mb-4 text-2xl font-bold uppercase">
          {section.data.title}
        </h2>
        <div
          className="text-xl"
          dangerouslySetInnerHTML={{
            __html: `<div>${section.data.content}</div>`,
          }}
        />
      </div>
    </div>
  );
}

function TwoColumn({section}: {section: any}) {
  const title = {
    placement: section.settings.title.placement,
    color: `text-${section.settings.title.color}`,
    alignment: `text-${section.settings.title.alignment}`,
  };

  const order = {
    image:
      section.settings.image.placement === 'LEFT'
        ? 'order-first'
        : 'order-last',
    content:
      section.settings.image.placement === 'LEFT'
        ? 'order-last'
        : 'order-first',
  };

  const width = {
    container:
      section.settings.layout === 'IMAGE_TWO_THIRDS'
        ? 'grid-cols-1 lg:grid-cols-3'
        : 'grid-cols1 lg:grid-cols-2',
    image:
      section.settings.layout === 'IMAGE_TWO_THIRDS'
        ? 'col-span-1 lg:col-span-2'
        : 'col-span-1 lg:col-span-1',
    content: 'col-span-1',
  };

  const imageTitlePosition: {[key: string]: string} = {
    BOTTOM_LEFT: 'bottom-5 left-5',
    TOP_LEFT: 'top-5 left-5',
    BOTTOM_RIGHT: 'bottom-5 right-5',
    TOP_RIGHT: 'top-5 right-5',
  };

  const imageTitle = {
    display: section.settings.image.title.display,
    position: imageTitlePosition[section.settings.image.title.placement],
    color: `text-${section.settings.image.title.color}`,
  };

  return (
    <div className="my-4">
      <div className="page-width">
        {title.placement === 'TOP' && (
          <h2 className="mb-4 text-2xl font-bold uppercase">
            {section.data.title}
          </h2>
        )}
        <div className={`grid ${width.container} `}>
          <div
            className={`${width.content} ${order.content} ${
              order.content === 'order-first' ? 'pr-0 lg:pr-8' : 'pl-0 lg:pl-8'
            }`}
          >
            {section.data.title && title.placement === 'CONTENT' && (
              <h2
                className={`mb-4 text-2xl font-bold uppercase ${title.color} ${title.alignment}`}
                dangerouslySetInnerHTML={{
                  __html: `<span>${section.data.title}</span>`,
                }}
              />
            )}
            <div
              className={`metafield-html flex items-center text-xl justify-content`}
              dangerouslySetInnerHTML={{
                __html: `<div>${section.data.content}</div>`,
              }}
            />
          </div>
          <div className={`${width.image} relative ${order.image}`}>
            <ImageMedia
              scale={2}
              sizes={
                section.data.image?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                section.data.image?.reference
                  ? [500, 450, 700]
                  : [500, 900, 1400]
              }
              width={section.data.image?.reference ? 375 : 750}
              data={section.data.image.reference as Media}
              loading="eager"
            />
            {section.settings.image.overlay.display && (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-white/[.2]"></div>
            )}
            {imageTitle.display && (
              <div
                className={`absolute z-10 ${imageTitle.position} ${imageTitle.color}`}
              >
                {section.data.image.reference.alt}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
