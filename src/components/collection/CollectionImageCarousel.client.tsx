import {Image, Link} from '@shopify/hydrogen';
// @ts-ignore
import {Swiper, SwiperSlide} from 'swiper/react';
// @ts-ignore
import {Navigation, Pagination} from 'swiper';

import {BrandTheme} from '~/types/suavecito';
import {IconArrow} from '~/components';

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

interface SlideData {
  image: Metafield;
  title: string;
  subtitle: string;
  cta: string;
  ctaLink: string;
  color: string;
}

export function CollectionImageCarousel({
  theme = 'suavecito',
  lang = 'en',
  slideData,
  marginTop = false,
  marginBottom = false,
}: {
  theme?: BrandTheme;
  lang?: 'en' | 'es';
  slideData: SlideData[];
  marginTop?: boolean;
  marginBottom?: boolean;
}) {
  return (
    <section
      className={`${marginTop ? 'mt-[35px]' : ''} ${
        marginBottom ? 'mb-[35px]' : ''
      }`}
    >
      <div className="page-width collection-image">
        <Swiper
          // install Swiper modules
          // @ts-ignore
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          // pagination={{clickable: true}}
          preventClicksPropagation={false}
          preventInteractionOnTransition={true}
          touchRatio={1}
          touchReleaseOnEdges={true}
          touchStartForcePreventDefault={true}
          threshold={15}
          breakpoints={{
            '480': {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 5,
            },
            '768': {
              slidesPerView: 2,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
            '1024': {
              slidesPerView: 3,
              slidesPerGroup: 1,
              spaceBetween: 10,
            },
          }}
        >
          {slideData.map((el, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <SwiperSlide key={`collection-carousel-${index}`}>
              <CollectionSlide data={el} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export function CollectionSlide({data}: {data: SlideData}) {
  const backgroundColor: {[key: string]: string} = {
    black: 'bg-black/60',
    red: 'bg-suave-red/60',
    yellow: 'bg-suave-yellow/60',
    pink: 'bg-suave-pink/60',
  };

  return (
    <div className="relative">
      {/*// @ts-ignore */}
      <Image
        src={data.image?.reference?.image.url}
        width={data.image?.reference?.image.width}
        height={data.image?.reference?.image.height}
        alt={data.image?.reference?.alt}
        loading="eager"
      />
      <div
        className={`absolute bottom-0 left-0 right-0 p-4 ${
          backgroundColor[data.color]
        }`}
      >
        <h3 className="font-bold text-white uppercase">{data.title}</h3>
        <p className="text-sm text-white">{data.subtitle}</p>
        <Link
          className="text-white underline uppercase hover:text-slate-300 text-md underline-offset-4"
          to={data.ctaLink}
        >
          {data.cta} <span className="text-2xl">&rsaquo;</span>
        </Link>
      </div>
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
