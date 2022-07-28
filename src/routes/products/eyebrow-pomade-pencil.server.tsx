import {ProductMetafieldColorsGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'eyebrow-pomade-pencil';
  return <ProductMetafieldColorsGetInspiredTemplate handle={handle} />;
}
