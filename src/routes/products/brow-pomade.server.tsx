import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'brow-pomade';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
