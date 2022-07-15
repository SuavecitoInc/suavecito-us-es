export function Divider({width = 'full'}: {width?: 'full' | 'half'}) {
  const widths = {
    full: 'w-full',
    half: 'w-[60%]',
  };

  const styles = `divider border-b-[1px] border-black ${widths[width]} mx-auto my-[10px]`;

  return (
    <div className="page-width">
      <div className={styles}></div>
    </div>
  );
}
