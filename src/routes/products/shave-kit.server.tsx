import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'shave-kit';
  return <ProductKitItemTemplate handle={handle} />;
}
