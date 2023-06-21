import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'mustache-wax';
  return <ProductMetafieldTemplate handle={handle} />;
}
