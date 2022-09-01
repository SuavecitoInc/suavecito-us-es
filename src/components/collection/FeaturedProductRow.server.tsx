import {FeaturedProductGrid} from './FeaturedProductGrid.server';
import {FeaturedBanner} from './FeaturedBanner.server';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

export function FeaturedProductRow({
  collection,
  url,
  position = 'left',
  theme = 'suavecito',
  lang = 'en',
}: {
  collection: Collection;
  url: string;
  position?: string;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
  return (
    <section>
      <div className="page-width">
        <FeaturedProductGrid
          collection={collection}
          url={url}
          position={position}
          theme={theme}
          lang={lang}
        />
      </div>
      <FeaturedBanner lang={lang} collection={collection} />
    </section>
  );
}
