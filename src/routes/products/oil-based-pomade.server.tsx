import {ProductMetafieldPomadeTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'oil-based-pomade';
  return <ProductMetafieldPomadeTemplate handle={handle} />;
}
