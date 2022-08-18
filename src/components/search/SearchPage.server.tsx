import {Heading, Input, PageHeader, IconSearch} from '~/components';
import {Layout} from '~/components/index.server';

const search_page: {[key: string]: any} = {
  title: {
    en: 'Search',
    es: 'Buscar',
  },
  placeholder: {
    en: 'Search...',
    es: 'Buscar...',
  },
  go: {
    en: 'Go',
    es: 'Buscar',
  },
};

export function SearchPage({
  searchTerm,
  children,
}: {
  searchTerm?: string | null;
  children: React.ReactNode;
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  return (
    <Layout>
      <PageHeader>
        <Heading as="h1">{search_page.title[LANG]}</Heading>
        <form className="relative flex w-full text-heading">
          <Input
            defaultValue={searchTerm}
            placeholder={search_page.placeholder[LANG]}
            // placeholder="Search…"
            type="search"
            variant="search"
            name="q"
          />
          <button className="absolute right-0 py-2" type="submit">
            {/* {search_page.go[LANG]} */}
            <IconSearch />
          </button>
        </form>
      </PageHeader>
      {children}
    </Layout>
  );
}
