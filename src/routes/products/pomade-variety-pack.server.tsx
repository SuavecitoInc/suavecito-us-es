import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'pomade-variety-pack';
  return <ProductKitItemTemplate handle={handle} />;
}
