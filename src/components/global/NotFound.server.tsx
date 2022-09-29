import {HydrogenResponse, Image} from '@shopify/hydrogen';

import {Suspense} from 'react';
import {Button, Heading, NotFoundImage} from '~/components';
import {Layout} from '~/components/index.server';

const not_found: {[key: string]: any} = {
  heading: {
    en: `We’ve lost this page`,
    es: `Hemos perdido esta pagina`,
  },
  description: {
    en: 'We couldn’t find the page you’re looking for. Try checking the URL or heading back to the home page.',
    es: 'No pudimos encontrar la página que estás buscando. Intente verificar el URL o regresar a la página de inicio.',
  },
  take_me_home: {
    en: 'Take me to the home page',
    es: 'Llévame a la página de inicio',
  },
};

export function NotFound({
  response,
  type = 'page',
}: {
  response?: HydrogenResponse;
  type?: string;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  if (response) {
    response.status = 404;
    response.statusText = 'Not found';
  }

  const brown = 'bg-[#371e12]';

  // const heading = `We’ve lost this ${type}`;
  // const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <Layout showTopPadding={false} backgroundColorClass={brown}>
      <div className="relative">
        <Suspense>
          <NotFoundImage />
        </Suspense>
        <div className="pb-10 md:pb-0 md:absolute md:bottom-[10%] lg:bottom-[20%] left-0 right-0 w-full bg-[#371e12] md:bg-transparent text-white text-center">
          <Heading
            format
            as="h3"
            size="heading"
            className="w-full max-w-full text-center"
          >
            {not_found.heading[LANG]}
          </Heading>
          <p className="p-4">{not_found.description[LANG]}</p>

          <Button width="auto" variant="secondary" to={'/'}>
            {not_found.take_me_home[LANG]}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
