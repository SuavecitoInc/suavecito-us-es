import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hydrating-conditioner';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
