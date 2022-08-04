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
    gridWrapper: `overflow-x-scroll w-full`,
    grid: `grid text-white mt-[3em] auto-rows-min text-copy`,
    colEven: 'bg-[#666666] opacity-90',
    colOdd: 'bg-black',
    colTitle: `font-bold uppercase border-solid border-white border-b py-[0.7em] px-[2em]`,
    row: 'flex-1 border-solid border-white border-b py-[0.7em] px-[2em]',
    bestFor: `py-[0.7em] px-[2em]`,
  };
  let gridItems = [];
  chartEl?.columns.forEach((el, index) => {
    gridItems.push({
      text: el.name,
      border: true,
      color: isEven(index) ? false : true,
    });
  });
  chartEl?.columns.forEach((el) => {
    el.rows.forEach((i, index) => {
      gridItems.push({
        text: i,
        border: true,
        color: isEven(index) ? false : true,
      });
    });
  });
  console.log(gridItems);
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
                {chartEl?.columns?.map((col, index) => (
                  <div
                    className={isEven(index) ? styles.colEven : styles.colOdd}
                    key={col.name}
                  >
                    <p className={styles.colTitle}>{col.name}</p>
                    {col.rows.map((row, index) => {
                      if (index !== col.rows.length - 1) {
                        return (
                          <div className={styles.row} key={row}>
                            {row}
                          </div>
                        );
                      }
                      return (
                        <div className={styles.bestFor} key={row}>
                          <strong>Best for: </strong>
                          {row}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
