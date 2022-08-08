import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import {Image, Link} from '@shopify/hydrogen';
import {AdBanners} from '~/data/ad-banners';
// @ts-ignore
import {Swiper, SwiperSlide} from 'swiper/react';
// @ts-ignore
import {Navigation, Pagination} from 'swiper';
import {BrandTheme} from '~/types/suavecito';
import {IconArrow} from '~/components';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductImageCarousel({
  collection,
  theme = 'suavecito',
}: {
  collection: Collection;
  theme?: BrandTheme;
}) {
  console.log('handle', collection.handle);
  return (
    <>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{clickable: true}}
          preventClicksPropagation={false}
          preventInteractionOnTransition={true}
          touchRatio={1}
          touchReleaseOnEdges={true}
          touchStartForcePreventDefault={true}
          threshold={15}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          {AdBanners[collection.handle] &&
            AdBanners[collection.handle].images.map((el, index: number) => (
              <SwiperSlide
                key={`${collection.handle}-ad-banner-${String(index)}`}
              >
                <CarouselBanner carouselBanner={el} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export function CarouselBanner({
  carouselBanner,
}: {
  carouselBanner: {banner: Metafield; url?: Metafield; label?: Metafield};
}) {
  return (
    <div>
      <Image
        src={carouselBanner.banner?.reference?.image.url}
        width={carouselBanner.banner?.reference?.image.width}
        height={carouselBanner.banner?.reference?.image.height}
        alt={carouselBanner.banner?.reference?.alt}
      />
      {carouselBanner.url ? (
        <Link to={carouselBanner.url.value}>
          <CarouselImageText carouselBanner={carouselBanner} />
        </Link>
      ) : (
        <CarouselImageText carouselBanner={carouselBanner} />
      )}
    </div>
  );
}

export function CarouselImageText({
  carouselBanner,
}: {
  carouselBanner: {banner: Metafield; url?: Metafield; label?: Metafield};
}) {
  return (
    <div
      className={`bg-suave-red text-white px-[1em] flex w-full min-h-[40px] items-center justify-between`}
    >
      <span>
        {carouselBanner.label ? carouselBanner.label.value : 'SHOP NOW'}
      </span>
      {carouselBanner.url && <IconArrow defaultFill={true} direction="right" />}
    </div>
  );
}
