import {ProductKitItemTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'suavecito-x-johnny-cupcakes-orange-cream-pomade-set';
  return <ProductKitItemTemplate handle={handle} />;
}
