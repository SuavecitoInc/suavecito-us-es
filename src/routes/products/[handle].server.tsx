import {useRouteParams} from '@shopify/hydrogen';
import {ProductTemplate} from '~/components/index.server';

export default function Product() {
  const {handle} = useRouteParams();
  return <ProductTemplate handle={handle} />;
}
