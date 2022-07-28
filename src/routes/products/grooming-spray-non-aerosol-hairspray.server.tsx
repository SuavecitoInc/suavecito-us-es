import {ProductMetafieldTemplate} from '~/components/index.server';

export default function Product() {
  const handle = 'grooming-spray-non-aerosol-hairspray';
  return <ProductMetafieldTemplate handle={handle} />;
}
