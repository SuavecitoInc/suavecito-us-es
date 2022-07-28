import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'firm-hold-hairspray';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
