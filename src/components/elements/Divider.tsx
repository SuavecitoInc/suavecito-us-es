export function Divider({
  width = 'full',
  className = '',
}: {
  width?: 'full' | 'half';
  className?: string;
}) {
  const widths = {
    full: 'w-full',
    half: 'w-[60%]',
  };

  const styles = `divider border-b-[1px] border-black ${widths[width]} mx-auto my-[10px] ${className}`;

  return (
    <div className="page-width">
      <div className={styles}></div>
    </div>
  );
}
