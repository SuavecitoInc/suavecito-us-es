import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hair-cream';
  return <ProductMetafieldTemplate handle={handle} />;
}
