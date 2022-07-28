import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'lipgrips-matte-liquid-lipstick';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
