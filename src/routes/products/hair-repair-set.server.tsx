import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hair-repair-set';
  return <ProductKitItemTemplate handle={handle} />;
}
