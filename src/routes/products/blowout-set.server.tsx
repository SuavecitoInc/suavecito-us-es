import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'blowout-set';
  return <ProductKitItemTemplate handle={handle} />;
}
