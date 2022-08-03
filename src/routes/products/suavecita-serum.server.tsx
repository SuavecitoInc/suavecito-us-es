import {ProductMetafieldGetInspiredTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'suavecita-serum';
  return <ProductMetafieldGetInspiredTemplate handle={handle} />;
}
