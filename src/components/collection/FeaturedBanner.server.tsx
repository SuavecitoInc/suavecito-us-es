import {CollectionFeaturedBanners} from '~/data/collection-featured-banners';

import type {Collection} from '@shopify/hydrogen/storefront-api-types';

export function FeaturedBanner({
  collection,
  lang = 'en',
}: {
  collection: Collection;
  lang?: 'en' | 'es';
}) {
  const chartEl = CollectionFeaturedBanners.find(
    (el) => el.handle === collection.handle,
  );
  const backgroundImg = chartEl?.backgroundImage.src;
  const gridLength = chartEl?.columns.length;
  const isEven = (num: number) => {
    if (num % 2 === 0) {
      return true;
    } else {
      return false;
    }
  };
  const styles = {
    wrapper: `bg-center bg-cover w-full min-h-[365px] h-full sm-max:min-h-[247px] hero-with-text`,
    inner: `py-[55px] relative min-h-[365px] h-full sm-max:min-h-[247px]`,
    table: `flex items-center justify-center flex-col text-[2.1rem] text-white text-center min-h-[365px] h-full sm-max:min-h-[247px]`,
    description: `page-width text-[.87rem] lg:text-[1.1rem] font-bold`,
    gridWrapper: `overflow-x-auto w-full collection-compare-table`,
    grid: `grid text-white mt-[3em] auto-rows-min text-copy`,
    colEven: 'bg-[#666666] opacity-90',
    colOdd: 'bg-black',
    colTitle: `font-bold uppercase border-solid border-white border-b py-[0.7em] px-[2em]`,
    row: 'flex-1 border-solid border-white border-b py-[0.7em] px-[2em]',
    bestFor: `py-[0.7em] px-[2em]`,
    gridItem:
      'grid place-items-center py-[0.7em] px-[2em] text-[0.92rem] md:text-[1rem]',
    h3: 'mb-[15px] text-[1.65rem] lg:text[2rem]',
    headerWrapper: 'page-width',
  };
  // handles CSS logic
  // eslint-disable-next-line prefer-const
  let gridItems: {
    text: string;
    border: boolean;
    color: boolean;
    title: boolean;
    id: number;
  }[] = [];
  chartEl?.columns.forEach((el, index) => {
    gridItems.push({
      text: el.name,
      border: true,
      color: isEven(index) ? false : true,
      title: true,
      id: index + 1,
    });
  });
  chartEl?.columns.forEach((el, upperIndex) => {
    el.rows.forEach((i, index) => {
      gridItems.push({
        text: i,
        border: upperIndex === chartEl.columns.length - 1 ? false : true,
        color: isEven(index) ? false : true,
        title: false,
        id: upperIndex + (index + 1) * 100,
      });
    });
  });

  const bestFor = {
    en: 'Best for',
    es: 'Lo mejor para',
  };
  return chartEl ? (
    <section>
      <div
        style={{backgroundImage: `url(${backgroundImg})`}}
        className={styles.wrapper}
      >
        <div className={styles.inner}>
          <div className={styles.table}>
            <div className={styles.headerWrapper}>
              <h3 className={styles.h3}>{chartEl?.title}</h3>
            </div>

            <p className={styles.description}>{chartEl?.description}</p>
            <div className={styles.gridWrapper}>
              <div
                style={{
                  gridTemplateColumns: `repeat(${gridLength}, minmax(280px, 1fr))`,
                }}
                className={styles.grid}
              >
                {gridItems?.map((item, index) => {
                  const gridStyles = `${styles.gridItem} ${
                    item.border ? 'border-solid border-b border-bottom' : ''
                  } ${!item.color ? 'bg-[#666666]' : 'bg-black'} ${
                    item.title ? 'font-bold uppercase' : ''
                  }`;
                  return (
                    <div className={gridStyles} key={item.id}>
                      <span>
                        <strong>{`${
                          !item.border ? `${bestFor[lang]}: ` : ''
                        }`}</strong>
                        {item.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
}
