import {FeaturedRowColumn} from './FeaturedRowColumn';

interface Metafield {
  value: string;
  reference?: object;
}

export function FeaturedRowColumns({
  one,
  two,
  three,
}: {
  one: any;
  two: any;
  three: any;
}) {
  return (
    <div className="page-width grid grid-cols-1 md:grid-cols-3 gap-6 py-[55px]">
      <FeaturedRowColumn {...one} />
      <FeaturedRowColumn {...two} />
      <FeaturedRowColumn {...three} />
    </div>
  );
}
