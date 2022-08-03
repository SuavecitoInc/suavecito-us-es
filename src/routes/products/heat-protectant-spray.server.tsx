import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'heat-protectant-spray';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
