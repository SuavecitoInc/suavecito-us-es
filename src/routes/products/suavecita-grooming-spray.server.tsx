import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'suavecita-grooming-spray';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
