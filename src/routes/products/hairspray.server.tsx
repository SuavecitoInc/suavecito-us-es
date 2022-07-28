import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hairspray';
  return <ProductMetafieldTemplate handle={handle} />;
}
