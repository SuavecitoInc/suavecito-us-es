import {CollectionFeaturedImages} from '~/components/index.server';

export default function Collection() {
  const handle = 'mens-hair';
  return <CollectionFeaturedImages handle={handle} />;
}
