import {VariantProductRow} from '~/components';
import {FeaturedBanner} from './FeaturedBanner.server';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

export function FeaturedVariantRow({
  collection,
  url,
  theme = 'suavecito',
}: {
  collection: Collection;
  url: string;
  theme?: BrandTheme;
}) {
  return (
    <section>
      <FeaturedBanner collection={collection} />
      <div className="page-width">
        <VariantProductRow collection={collection} url={url} theme={theme} />
      </div>
    </section>
  );
}
