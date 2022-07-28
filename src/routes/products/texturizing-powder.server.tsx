import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'texturizing-powder';
  return <ProductMetafieldTemplate handle={handle} />;
}
