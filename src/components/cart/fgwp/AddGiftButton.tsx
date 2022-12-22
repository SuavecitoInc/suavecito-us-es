import {ImLock} from 'react-icons/im';
import {Button} from '~/components/';

const fgwp_locale: {[key: string]: any} = {
  buttons: {
    add: {
      en: 'Add free Gift',
      es: 'Agregar regalo gratis',
    },
    spend: {
      en: 'Spend',
      es: 'Gaste',
    },
    left_to_unlock: {
      en: 'to unlock gift',
      es: 'para obtener el regalo',
    },
    added: {
      en: 'Gift Added',
      es: 'Regalo añadido',
    },
  },
  or: {
    en: 'OR',
    es: 'O',
  },
};

function AddGiftButton({
  lang,
  freeGiftAvailable,
  addFreeGiftToCart,
  currentTier,
  tier,
  tierDiff,
  tierDisabled,
}: {
  lang: 'en' | 'es';
  freeGiftAvailable: boolean;
  addFreeGiftToCart: (tierSelected: number) => void;
  currentTier: number;
  tier: number;
  tierDiff: number;
  tierDisabled: boolean;
}) {
  const giftAdded = !freeGiftAvailable && currentTier > 0 ? true : false;

  if (giftAdded)
    return (
      <Button disabled={true} variant="secondary">
        {fgwp_locale.buttons.added[lang]}
      </Button>
    );

  return (
    <>
      {tierDiff > 0 ? (
        <p>
          {`${fgwp_locale.buttons.spend[lang]} $${tierDiff} ${fgwp_locale.buttons.left_to_unlock[lang]}`}
        </p>
      ) : (
        <div className="h-5 mb-[2px]" />
      )}

      <Button
        type="button"
        disabled={tierDisabled}
        variant={tierDisabled ? 'secondary' : 'suavecito'}
        onClick={() => addFreeGiftToCart(tier)}
        className="w-full text-center md:w-1/2 lg:w-full"
      >
        {!tierDisabled ? (
          fgwp_locale.buttons.add[lang]
        ) : (
          <ImLock className="w-5 h-5 mx-auto text-center" />
        )}
      </Button>
    </>
  );
}

export default AddGiftButton;
