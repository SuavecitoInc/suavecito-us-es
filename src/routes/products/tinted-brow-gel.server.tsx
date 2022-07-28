import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'tinted-brow-gel';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
