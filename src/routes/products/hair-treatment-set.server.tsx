import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'hair-treatment-set';
  return <ProductKitItemTemplate handle={handle} />;
}
