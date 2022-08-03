import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'classic-barber-toolkit';
  return <ProductKitItemTemplate handle={handle} />;
}
