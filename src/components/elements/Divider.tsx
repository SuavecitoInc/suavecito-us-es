import {BrandTheme} from '~/types/suavecito';

export function Divider({
  theme = 'suavecito',
  width = 'full',
  className = '',
}: {
  theme?: BrandTheme;
  width?: 'full' | 'half';
  className?: string;
}) {
  const widths = {
    full: 'w-full',
    half: 'w-[60%]',
  };

  const styles = `divider border-b-[1px] ${
    theme === 'premium blends' ? 'border-white' : 'border-black'
  } ${widths[width]} mx-auto my-[10px] ${className}`;

  return <div className={styles} />;
}
