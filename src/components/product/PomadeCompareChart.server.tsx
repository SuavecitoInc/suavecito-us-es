import {Image, Link} from '@shopify/hydrogen';
import {Media} from '@shopify/hydrogen/storefront-api-types';
import {chartData} from '../../data/pomade-chart-es';
import {Heading} from '../index';

const colors: {
  [key: string]: {
    header: string;
    body: string;
  };
} = {
  'Light Blue': {
    header: 'bg-[#A7D5E4]',
    body: 'bg-[#E2F1F6]',
  },
  Redwood: {
    header: 'bg-[#9E5F53]',
    body: 'bg-[#DECAC5]',
  },
  'Pastel Orange': {
    header: 'bg-[#FABB5D]',
    body: 'bg-[#FCE9C9]',
  },
  'Dark Sea Green': {
    header: 'bg-[#8DB58F]',
    body: 'bg-[#D9E7DA]',
  },
  'Middle Red': {
    header: 'bg-[#CD8C79]',
    body: 'bg-[#EDD9D4]',
  },
  Camel: {
    header: 'bg-[#AE8E67]',
    body: 'bg-[#E5D9CA]',
  },
};

export function PomadeCompareChart({lang = 'en'}: {lang: 'en' | 'es'}) {
  const title = lang === 'es' ? 'Compare' : 'Compare';
  const languageCode = lang.toLowerCase();
  const washabilityTitle = lang === 'es' ? 'Lavabilidad' : 'Washability';
  const bestForTitle = lang === 'es' ? 'Mejor Para' : 'Best For';

  return (
    <section className="py-[35px]">
      <Heading
        as="h3"
        size="heading"
        className="uppercase text-center mx-auto max-w-full mb-[20px]"
      >
        {title}
      </Heading>
      <div className="w-full overflow-scroll">
        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-image`}
              className="p-2"
            >
              <Link to={`/products${product.data.link}`}>
                <FeaturedMedia
                  scale={2}
                  sizes={
                    product.featuredImage?.reference
                      ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                      : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
                  }
                  widths={
                    product.featuredImage?.reference
                      ? [500, 450, 700]
                      : [500, 900, 1400]
                  }
                  width={product.featuredImage?.reference ? 375 : 750}
                  data={product.featuredImage?.reference as unknown as Media}
                  loading="eager"
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center text-sm">
          {chartData.map(({product}) => (
            <div
              key={product.data[languageCode].title}
              className={`${
                colors[product.data.color].header
              } px-4 pt-4 font-bold uppercase`}
            >
              {product.data[languageCode].title}
            </div>
          ))}
        </div>

        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center text-sm">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-triangle`}
              className={`triangle-container ${
                colors[product.data.color].body
              } p-4`}
            >
              <div
                className={`triangle ${colors[product.data.color].header} p-4`}
              />
            </div>
          ))}
        </div>

        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center text-sm">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-${product.data[languageCode].hold}`}
              className={`${
                colors[product.data.color].body
              } p-4 border-b-2 border-black`}
            >
              {product.data[languageCode].hold}
            </div>
          ))}
        </div>
        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center text-sm">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-${product.data[languageCode].shine}`}
              className={`${
                colors[product.data.color].body
              } p-4 border-b-2 border-black`}
            >
              {product.data[languageCode].shine}
            </div>
          ))}
        </div>
        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-center text-sm">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-${product.data[languageCode].washability}`}
              className={`${
                colors[product.data.color].body
              } p-4 border-b-2 border-black`}
            >
              {washabilityTitle}: {product.data[languageCode].washability}
            </div>
          ))}
        </div>
        <div className="w-[500vw] md:w-full grid grid-rows grid-cols-6 gap-1 text-sm">
          {chartData.map(({product}) => (
            <div
              key={`${product.data[languageCode].title}-${product.data[languageCode].bestFor}`}
              className={`${colors[product.data.color].body} p-4`}
            >
              <span className="font-bold">{bestForTitle}: </span>
              {product.data[languageCode].bestFor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface FeaturedMediaProps {
  data: Media;
  loading?: HTMLImageElement['loading'];
  scale?: 2 | 3;
  sizes: string;
  width: number;
  widths: number[];
}

function FeaturedMedia({
  data,
  loading,
  scale,
  sizes,
  width,
  widths,
}: FeaturedMediaProps) {
  return (
    <Image
      widths={widths}
      sizes={sizes}
      alt={data.alt || 'Marketing Banner Image'}
      className="block object-cover w-full h-full"
      // @ts-ignore
      data={data.image}
      loading={loading}
      width={width}
      loaderOptions={{scale, crop: 'center'}}
    />
  );
}
