import type {Collection, Product} from '@shopify/hydrogen/storefront-api-types';
import SwiperCore, {Navigation, Pagination, Scrollbar} from 'swiper';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/scrollbar';
import {Image} from '@shopify/hydrogen';
export function ProductImageCarousel({collection}: {collection: Collection}) {
  return (
    <>
      <div>
        <Image
          height={667}
          width={553}
          src={
            'https://cdn.shopify.com/s/files/1/0274/1389/files/subscription_box_vertical_hair.jpg?v=1648599886'
          }
        ></Image>
      </div>
    </>
  );
}
