import {Image} from '@shopify/hydrogen';
import {Collection} from '@shopify/hydrogen/storefront-api-types';

export function HeroBanner({collection}: {collection: Collection}) {
  return (
    <section>
      <div className={`relative`}>
        <Image
          className="w-full object-cover h-[475px] sm-max:h-[360px]"
          src={`https://cdn.shopify.com/s/files/1/0274/1389/files/suavecito-mens-hair-banner.jpg?v=1632786259`}
          height={1449}
          width={475}
          alt={'Hero Banner'}
        ></Image>
        <p className="absolute bottom-[-30px] sm-max:bottom-[-16px] right-[30px] text-[4.5rem] font-nexa-rust text-white sm-max:text-[2.5rem]">
          {collection.title}
        </p>
      </div>
    </section>
  );
}
