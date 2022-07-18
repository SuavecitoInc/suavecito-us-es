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
    | 'suavecito'
    | 'suavecita'
    | 'yellow'
    | 'grey'
    | 'primary-inverted';

  width?: 'auto' | 'full';
  [key: string]: any;
}) {
  const Component = props?.to ? Link : as;

  const baseButtonClasses = 'inline-block font-medium text-center py-2 px-4';

  const variants = {
    primary: `${baseButtonClasses} bg-primary hover:bg-primary text-contrast`,
    secondary: `${baseButtonClasses} border border-primary/10 bg-contrast text-primary`,
    inline: 'border-b border-primary/10 leading-none pb-1',
    suavecito: `${baseButtonClasses} bg-suave-red hover:bg-suave-red-focus text-contrast`,
    suavecita: `${baseButtonClasses} bg-suave-pink hover:bg-suave-pink-focus text-contrast`,
    yellow: `${baseButtonClasses} bg-suave-yellow hover:bg-suave-yellow-focus text-contrast`,
    grey: `${baseButtonClasses} bg-suave-grey hover:bg-suave-grey-focus text-contrast`,
    'primary-inverted': `${baseButtonClasses} bg-suave-white hover:bg-suave-white-focus text-contrast text-suave-red`,
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
