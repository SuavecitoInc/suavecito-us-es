import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'suavecita-pomade';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
