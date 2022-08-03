import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'og-shampoo-conditioner-set';
  return <ProductMetafieldTemplate handle={handle} />;
}
