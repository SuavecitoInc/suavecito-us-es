import clsx from 'clsx';
import {Link} from '@shopify/hydrogen';
import {missingClass} from '~/lib/utils';

export function Button({
  as = 'button',
  className = '',
  variant = 'suavecito',
  width = 'auto',
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'inline'
    | 'yellow'
    | 'grey'
    | 'primary-inverted'
    | 'suavecito'
    | 'suavecita'
    | 'premium blends'
    | 'premium blends secondary'
    | 'firme club'
    | 'cerveza cito'
    | 'tres noir';

  width?: 'auto' | 'full';
  [key: string]: any;
}) {
  const Component = props?.to ? Link : as;

  const baseButtonClasses =
    'btn inline-block font-medium text-center py-2 px-4 rounded-sm';

  const variants = {
    primary: `${baseButtonClasses} bg-primary hover:bg-primary text-contrast`,
    secondary: `${baseButtonClasses} border border-primary/10 bg-contrast text-primary`,
    inline: 'border-b border-primary/10 leading-none pb-1',
    yellow: `${baseButtonClasses} bg-suave-yellow hover:bg-suave-yellow-focus text-contrast`,
    grey: `${baseButtonClasses} bg-suave-grey hover:bg-suave-grey-focus text-contrast`,
    'primary-inverted': `${baseButtonClasses} bg-suave-white hover:bg-suave-white-focus text-contrast text-suave-red`,
    suavecito: `${baseButtonClasses} bg-suave-red hover:bg-suave-red-focus text-contrast`,
    suavecita: `${baseButtonClasses} bg-suave-pink hover:bg-suave-pink-focus text-contrast`,
    'premium blends': `${baseButtonClasses} bg-suave-white hover:bg-suave-white-focus text-black`,
    'premium blends secondary': `${baseButtonClasses} border border-primary/10 bg-[#2E2E2E] text-suave-grey`,
    'firme club': `${baseButtonClasses} bg-suave-red hover:bg-suave-red-focus text-contrast`,
    'cerveza cito': `${baseButtonClasses} bg-suave-red hover:bg-suave-red-focus text-contrast`,
    'tres noir': `${baseButtonClasses} bg-suave-red hover:bg-suave-red-focus text-contrast`,
  };

  const widths = {
    auto: 'w-auto',
    full: 'w-full',
  };

  const styles = clsx(
    missingClass(className, 'bg-') && variants[variant],
    missingClass(className, 'w-') && widths[width],
    className,
  );

  return <Component className={styles} {...props} />;
}
