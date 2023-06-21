import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'suavecita-lipstick';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
