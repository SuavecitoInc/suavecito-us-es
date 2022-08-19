import {useRef} from 'react';
import {useNavigate} from '@shopify/hydrogen';
import {useScroll} from 'react-use';
import {Button, Text} from '~/components';

const empty_cart: {[key: string]: any} = {
  message: {
    en: 'Looks like you haven’t added anything yet, let’s get you started!',
    es: 'Parece que aún no has añadido nada, ¡comencemos!',
  },
  button: {
    continue_shopping: {
      en: 'Continue Shopping',
      es: 'Seguir comprando',
    },
  },
};

export function CartEmpty({
  onClose,
  layout = 'drawer',
}: {
  onClose?: () => void;
  layout?: 'page' | 'drawer';
}) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;

  const navigate = useNavigate();

  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  // onClose undefined set onClose to navigate back to home
  if (!onClose) onClose = () => navigate('/');

  const container = {
    drawer: `grid content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12 ${
      y > 0 ? 'border-t' : ''
    }`,
    page: `grid pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
  };

  return (
    <div ref={scrollRef} className={container[layout]}>
      <section className="grid gap-6">
        <Text format>{empty_cart.message[LANG]}</Text>
        <div>
          <Button onClick={onClose}>
            {empty_cart.button.continue_shopping[LANG]}
          </Button>
        </div>
      </section>
    </div>
  );
}
