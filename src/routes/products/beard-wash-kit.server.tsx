import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'beard-wash-kit';
  return <ProductKitItemTemplate handle={handle} />;
}
