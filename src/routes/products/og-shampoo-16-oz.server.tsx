import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'og-shampoo-16-oz';
  return <ProductMetafieldTemplate handle={handle} />;
}
