import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'semi-matte-lipstick';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
