import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import {Image} from '@shopify/hydrogen';
// @ts-ignore
import {Swiper, SwiperSlide} from 'swiper/react';
// @ts-ignore
import {Navigation, Pagination} from 'swiper';
/*
[
  {
    "collection handle" : {
      images: [
        {
          image {
          }
          url {

          }
        }
      ]
    }
  },
]
*/

export function ProductImageCarousel({collection}: {collection: Collection}) {
  return (
    <>
      <div>
        <Swiper
          // install Swiper modules
          className="relative"
          modules={[Navigation, Pagination]}
          slidesPerView={1}
          navigation
          pagination={{clickable: true}}
          // onSwiper={(swiper) => console.log(swiper)}
          // onSlideChange={() => console.log('slide change')}
        >
          <SwiperSlide>
            <Image
              alt={'alt'}
              height={667}
              width={553}
              src={
                'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886'
              }
            ></Image>
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt={'alt'}
              height={667}
              width={553}
              src={
                'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886'
              }
            ></Image>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}

// export function CarouselImage({}) {
//   return (
//     <figure className="">
//       <Image></Image>
//     </figure>
//   );
// }
