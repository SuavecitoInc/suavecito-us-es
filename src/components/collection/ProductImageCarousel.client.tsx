import {Image, Link} from '@shopify/hydrogen';
// @ts-ignore
import {Swiper, SwiperSlide} from 'swiper/react';
// @ts-ignore
import {Navigation, Pagination} from 'swiper';

import {AdBanners} from '~/data/ad-banners';

import {BrandTheme} from '~/types/suavecito';
import {IconArrow} from '~/components';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';
interface Metafield {
  value: string;
  reference?: {
    mediaContentType: string;
    alt: string;
    previewImage: {
      url: string;
    };
    image: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export function ProductImageCarousel({
  collection,
  theme = 'suavecito',
  lang = 'en',
}: {
  collection: Collection;
  theme?: BrandTheme;
  lang?: 'en' | 'es';
}) {
  const shopNowLabel = lang === 'es' ? 'COMPRA AHORA' : 'SHOP NOW';
  return (
    <>
      <div>
        <Swiper
          // install Swiper modules
          // @ts-ignore
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
        >
          {AdBanners[collection.handle] &&
            AdBanners[collection.handle].images.map((el, index: number) => (
              <SwiperSlide
                key={`${collection.handle}-ad-banner-${String(index)}`}
              >
                <CarouselBanner
                  carouselBanner={el}
                  shopNowLabel={shopNowLabel}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
}

export function CarouselBanner({
  carouselBanner,
  shopNowLabel,
}: {
  carouselBanner: {banner: Metafield; url?: Metafield; label?: Metafield};
  shopNowLabel: string;
}) {
  return (
    <div>
      {/*// @ts-ignore */}
      <Image
        src={carouselBanner.banner?.reference?.image.url}
        width={carouselBanner.banner?.reference?.image.width}
        height={carouselBanner.banner?.reference?.image.height}
        alt={carouselBanner.banner?.reference?.alt}
        loading="eager"
      />
      {carouselBanner.url ? (
        <Link to={carouselBanner.url.value}>
          <CarouselImageText
            carouselBanner={carouselBanner}
            shopNowLabel={shopNowLabel}
          />
        </Link>
      ) : (
        <CarouselImageText
          carouselBanner={carouselBanner}
          shopNowLabel={shopNowLabel}
        />
      )}
    </div>
  );
}

export function CarouselImageText({
  carouselBanner,
  shopNowLabel,
}: {
  carouselBanner: {banner: Metafield; url?: Metafield; label?: Metafield};
  shopNowLabel: string;
}) {
  return (
    <div
      className={`bg-suave-red text-white px-[1em] flex w-full min-h-[40px] items-center justify-between`}
    >
      <span>
        {carouselBanner.label ? carouselBanner.label.value : shopNowLabel}
      </span>
      {carouselBanner.url && <IconArrow defaultFill={true} direction="right" />}
    </div>
  );
}
