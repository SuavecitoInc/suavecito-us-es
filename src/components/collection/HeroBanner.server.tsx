import {Image} from '@shopify/hydrogen';

import {CollectionHeroData} from '~/data/collection-data';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';

export function HeroBanner({collection}: {collection: Collection}) {
  const currentChartEl = CollectionHeroData.find(
    (el) => el.handle === collection.handle,
  );
  return (
    <section>
      <div className={`relative`}>
        {/* @ts-ignore */}
        {currentChartEl && (
          <Image
            className="w-full object-cover h-[475px] sm-max:h-[360px]"
            src={currentChartEl?.heroImage.reference.image.url}
            height={currentChartEl?.heroImage.reference.image.height}
            width={currentChartEl?.heroImage.reference.image.width}
            alt={currentChartEl?.heroImage.reference.alt}
          />
        )}
        <div className="page-width">
          <p className="break-words absolute bottom-[-30px] sm-max:bottom-[-16px] md:right-[30px] sm-max:left-[17px] md:text-[4.5rem] font-nexa-rust text-white text-[2rem]">
            {currentChartEl?.title}
          </p>
        </div>
      </div>
    </section>
  );
}
