import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'beard-and-mustache-kit';
  return <ProductKitItemTemplate handle={handle} />;
}
