import {Divider} from '../index';
import {ProductSectionImageText} from './ProductSectionImageText.server';

interface Metafield {
  value: string;
  reference?: object;
}

export function ProductSectionContentGrid({
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
      <Divider width="half" className="my-[55px]" />
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
    </section>
  );
}
