import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'body-soap';
  return <ProductMetafieldTemplate handle={handle} />;
}
