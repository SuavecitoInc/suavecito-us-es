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
          ></Image>
        )}

        <p className="absolute bottom-[-30px] sm-max:bottom-[-16px] right-[30px] text-[4.5rem] font-nexa-rust text-white sm-max:text-[2.5rem]">
          {currentChartEl?.title}
        </p>
      </div>
    </section>
  );
}
