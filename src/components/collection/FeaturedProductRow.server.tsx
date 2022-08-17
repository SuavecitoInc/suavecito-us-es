import {FeaturedProductGrid} from '~/components';
import {FeaturedBanner} from './FeaturedBanner.server';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';
import type {BrandTheme} from '~/types/suavecito';

export function FeaturedProductRow({
  collection,
  url,
  position = 'left',
  theme = 'suavecito',
}: {
  collection: Collection;
  url: string;
  position?: string;
  theme?: BrandTheme;
}) {
  return (
    <section>
      <div className="page-width">
        <FeaturedProductGrid
          collection={collection}
          url={url}
          position={position}
          theme={theme}
        />
      </div>
      <FeaturedBanner collection={collection} />
    </section>
  );
}
