import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'mens-hair-kit';
  return <ProductKitItemTemplate handle={handle} />;
}
