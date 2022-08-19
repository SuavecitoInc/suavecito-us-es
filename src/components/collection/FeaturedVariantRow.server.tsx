import {VariantProductRow} from './VariantProductRow.server';
import {FeaturedBanner} from './FeaturedBanner.server';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

export function FeaturedVariantRow({
  collection,
  url,
  theme = 'suavecito',
  lang = 'en',
}: {
  collection: Collection;
  url: string;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
  return (
    <section>
      <FeaturedBanner collection={collection} />
      <div className="page-width">
        <VariantProductRow
          collection={collection}
          url={url}
          theme={theme}
          lang={lang}
        />
      </div>
    </section>
  );
}
