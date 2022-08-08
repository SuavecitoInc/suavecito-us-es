import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'deluxe-barber-toolkit';
  return <ProductKitItemTemplate handle={handle} />;
}
