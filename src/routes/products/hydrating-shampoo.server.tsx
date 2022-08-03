import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hydrating-shampoo';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
