import {ProductMetafieldSPBTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'premium-blends-matte-pomade';
  return <ProductMetafieldSPBTemplate handle={handle} />;
}
