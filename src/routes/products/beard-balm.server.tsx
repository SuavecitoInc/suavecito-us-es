import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'beard-balm';
  return <ProductMetafieldTemplate handle={handle} />;
}
