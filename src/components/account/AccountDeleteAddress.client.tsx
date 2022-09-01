import {Text, Button} from '~/components/elements';
import {useRenderServerComponents} from '~/lib/utils';

export function AccountDeleteAddress({
  addressId,
  close,
  lang = 'en',
}: {
  addressId: string;
  close: () => void;
  lang?: 'en' | 'es';
}) {
  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function deleteAddress(id: string) {
    const response = await callDeleteAddressApi(id);
    if (response.error) {
      alert(response.error);
      return;
    }
    renderServerComponents();
    close();
  }
  const editTranslations = {
    confirmRemoval: {
      en: 'Confirm removal',
      es: 'Confirmar la eliminación',
    },
    areYouSure: {
      en: 'Are you sure you wish to remove this address?',
      es: '¿Está seguro de que desea eliminar esta dirección?',
    },
    confirm: {
      en: 'Confirm',
      es: 'Confirmar',
    },
    cancel: {
      en: 'Cancel',
      es: 'Cancelar',
    },
  };
  return (
    <>
      <Text className="mb-4" as="h3" size="lead">
        {editTranslations.confirmRemoval[lang]}
      </Text>
      <Text as="p">{editTranslations.areYouSure[lang]}</Text>
      <div className="mt-6">
        <Button
          className="text-sm"
          onClick={() => {
            deleteAddress(addressId);
          }}
          variant="primary"
          width="full"
        >
          {editTranslations.confirm[lang]}
        </Button>
        <Button
          className="text-sm mt-2"
          onClick={close}
          variant="secondary"
          width="full"
        >
          {editTranslations.cancel[lang]}
        </Button>
      </div>
    </>
  );
}

export async function callDeleteAddressApi(id: string) {
  try {
    const res = await fetch(`/account/address/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
      },
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error removing address. Please try again.',
    };
  }
}
