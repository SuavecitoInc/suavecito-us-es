import {ProductMetafieldSPBTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'premium-blends-hair-pomade';
  return <ProductMetafieldSPBTemplate handle={handle} />;
}
