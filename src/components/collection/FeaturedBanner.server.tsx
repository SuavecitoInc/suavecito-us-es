import {Image} from '@shopify/hydrogen';
import {HairChart} from '~/data/mens-hair-chart';
import {Collection} from '@shopify/hydrogen/storefront-api-types';
export function FeaturedBanner({collection}: {collection: Collection}) {
  const chartEl = HairChart.find((el) => el.title === collection.title);
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
    wrapper: `bg-center bg-cover w-full min-h-[475px] h-full sm-max:min-h-[357px] hero-with-text`,
    inner: `py-[55px] relative`,
    table: `flex items-center justify-center flex-col text-[2.1rem] text-white text-center page-width`,
    description: `text-[1.1rem] font-bold`,
    gridWrapper: `overflow-x-auto w-full`,
    grid: `grid text-white mt-[3em] auto-rows-min text-copy`,
    colEven: 'bg-[#666666] opacity-90',
    colOdd: 'bg-black',
    colTitle: `font-bold uppercase border-solid border-white border-b py-[0.7em] px-[2em]`,
    row: 'flex-1 border-solid border-white border-b py-[0.7em] px-[2em]',
    bestFor: `py-[0.7em] px-[2em]`,
    gridItem: 'grid place-items-center py-[0.7em] px-[2em]',
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
  return (
    <section>
      <div
        style={{backgroundImage: `url(${backgroundImg})`}}
        className={styles.wrapper}
      >
        <div className={styles.inner}>
          <div className={styles.table}>
            <h3>{collection.title}</h3>
            <p className={styles.description}>{chartEl?.description}</p>
            <div className={styles.gridWrapper}>
              <div
                style={{gridTemplateColumns: `repeat(${gridLength}, 1fr)`}}
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
                        <strong>{`${!item.border ? 'Best For: ' : ''}`}</strong>
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
  );
}