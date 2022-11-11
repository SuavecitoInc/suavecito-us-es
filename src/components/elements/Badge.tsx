export function Badge({
  label = 'Sale',
  tags,
}: {
  label?: 'Sale' | 'New' | 'BOGO' | 'B2G1F';
  tags: string[];
}) {
  const LANG: 'en' | 'es' = import.meta.env.PUBLIC_LANGUAGE_CODE || 'en';

  const variants: {[key: string]: any} = {
    sale: 'bg-suave-yellow text-black',
    new: 'bg-black text-white',
    bogo: 'bg-suave-yellow text-black',
    b2g1f: 'bg-suave-yellow text-black',
  };

  const labels: {[key: string]: any} = {
    sale: {
      en: 'Sale',
      es: 'Oferta',
    },
    new: {
      en: 'New',
      es: 'Nuevo',
    },
    bogo: {
      en: 'BOGO',
      es: 'BOGO',
    },
    b2g1f: {
      en: 'B2G1F',
      es: 'B2G1F',
    },
  };

  const variant = label.toLowerCase();

  return (
    <span
      className={`${variants[variant]} font-semibold mr-2 px-2.5 py-0.5 ml-4 self-start`}
    >
      {labels[variant][LANG]}
    </span>
  );
}
