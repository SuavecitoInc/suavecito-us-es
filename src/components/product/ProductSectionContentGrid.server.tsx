import type {BrandTheme} from '~/types/suavecito';
import {Divider} from '../index';
import {ProductSectionImageText} from './ProductSectionImageText.server';

const LANG = import.meta.env.PUBLIC_LANGUAGE;

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionContentGrid({
  lang = LANG,
  theme = 'suavecito',
  productSectionFeaturedImage1,
  productSectionFeaturedImage2,
  productSectionDescription,
  productSectionListItemText1,
  productSectionListItemText2,
  productSectionListItemText3,
  productSectionListItemText4,
  productSectionListItemImage1,
  productSectionListItemImage2,
  productSectionListItemImage3,
  productSectionListItemImage4,
}: {
  lang?: 'EN' | 'ES';
  theme?: BrandTheme;
  productSectionFeaturedImage1: Metafield;
  productSectionFeaturedImage2: Metafield;
  productSectionDescription: Metafield;
  productSectionListItemText1: Metafield;
  productSectionListItemText2: Metafield;
  productSectionListItemText3: Metafield;
  productSectionListItemText4: Metafield;
  productSectionListItemImage1: Metafield;
  productSectionListItemImage2: Metafield;
  productSectionListItemImage3: Metafield;
  productSectionListItemImage4: Metafield;
}) {
  return (
    <section>
      <Divider width="half" theme={theme} className="my-[55px]" />
      <div
        className={`flex flex-col gap-6 md:gap-0 ${
          theme === 'premium blends' && 'text-white'
        }`}
      >
        <ProductSectionImageText
          featuredImage={productSectionFeaturedImage1}
          featuredText={productSectionDescription}
        />
        {productSectionListItemText1 && (
          <ProductSectionImageText
            featuredImage={productSectionFeaturedImage2}
            imagePosition="left"
            items={[
              {
                text: productSectionListItemText1,
                image: productSectionListItemImage1,
              },
              {
                text: productSectionListItemText2,
                image: productSectionListItemImage2,
              },
              {
                text: productSectionListItemText3,
                image: productSectionListItemImage3,
              },
              {
                text: productSectionListItemText4,
                image: productSectionListItemImage4,
              },
            ]}
          />
        )}
      </div>
    </section>
  );
}
