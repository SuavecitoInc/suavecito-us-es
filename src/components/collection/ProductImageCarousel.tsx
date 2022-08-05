import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import {Image} from '@shopify/hydrogen';

// import {SwiperSlide} from 'swiper/react';

export function ProductImageCarousel({collection}: {collection: Collection}) {
  // SwiperCore.use([Navigation, Pagination]);
  // const swiper = new Swiper('.swiper-container', {
  //   // Optional parameters
  //   // If we need pagination
  //   pagination: {
  //     el: '.swiper-pagination',
  //   },

  //   // Navigation arrows
  //   navigation: {
  //     nextEl: '.swiper-button-next',
  //     prevEl: '.swiper-button-prev',
  //   },
  // });
  return (
    <>
      {/* <div className="w-full h-full">
        <div className="swiper-container h-[667px] w-[553px]">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <Image
                alt={'alt'}
                height={667}
                width={553}
                src={
                  'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886'
                }
              ></Image>
            </div>
            <div className="swiper-slide">Slide 2</div>
            <div className="swiper-slide">Slide 3</div>
          </div>
          <div className="swiper-pagination"></div>

          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-scrollbar"></div>
        </div>
      </div> */}
      <div>image</div>
    </>
  );
}
