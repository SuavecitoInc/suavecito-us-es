import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'shine-spray';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
