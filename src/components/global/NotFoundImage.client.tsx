import {Image} from '@shopify/hydrogen';

import svgImage from '../../../public/images/suavecito-santa-ana-404.svg';

export function NotFoundImage() {
  return (
    <Image
      className="w-full h-auto"
      src={svgImage}
      alt="Not Found"
      width={1080}
      height="auto"
    />
  );
}
