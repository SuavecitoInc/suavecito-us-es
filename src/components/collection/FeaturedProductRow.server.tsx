import {Image} from '@shopify/hydrogen';
import {FeaturedProductGrid} from '~/components';
import {FeaturedBanner} from './FeaturedBanner.server';
import {Collection} from '@shopify/hydrogen/storefront-api-types';

export function FeaturedProductRow({
  collection,
  url,
  position = 'left',
}: {
  collection: Collection;
  url: string;
  position?: string;
}) {
  return (
    <section>
      <div className="page-width">
        <FeaturedProductGrid
          collection={collection}
          url={url}
          position={position}
        />
      </div>
      <FeaturedBanner collection={collection} />
    </section>
  );
}
