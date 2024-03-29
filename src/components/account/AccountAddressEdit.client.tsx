import {useMemo, useState} from 'react';
import {useRenderServerComponents} from '~/lib/utils';

import {Button, Text} from '~/components';

export function AccountAddressEdit({
  address,
  defaultAddress,
  close,
  lang = 'en',
}: {
  address: any;
  defaultAddress: boolean;
  close: () => void;
  lang?: 'en' | 'es';
}) {
  const isNewAddress = useMemo(() => !Object.keys(address).length, [address]);

  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<null | string>(null);
  const [address1, setAddress1] = useState(address?.address1 || '');
  const [address2, setAddress2] = useState(address?.address2 || '');
  const [firstName, setFirstName] = useState(address?.firstName || '');
  const [lastName, setLastName] = useState(address?.lastName || '');
  const [company, setCompany] = useState(address?.company || '');
  const [country, setCountry] = useState(address?.country || '');
  const [province, setProvince] = useState(address?.province || '');
  const [city, setCity] = useState(address?.city || '');
  const [zip, setZip] = useState(address?.zip || '');
  const [phone, setPhone] = useState(address?.phone || '');
  const [isDefaultAddress, setIsDefaultAddress] = useState(defaultAddress);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);

    const response = await callUpdateAddressApi({
      id: address?.originalId,
      firstName,
      lastName,
      company,
      address1,
      address2,
      country,
      province,
      city,
      zip,
      phone,
      isDefaultAddress,
    });

    setSaving(false);

    if (response.error) {
      setSubmitError(response.error);
      return;
    }

    renderServerComponents();
    close();
  }

  const editTranslations = {
    addAddress: {
      en: 'Add address',
      es: 'Añadir address',
    },
    editAddress: {
      en: 'Edit Address',
      es: 'Editar dirección',
    },
    firstName: {
      en: 'First name',
      es: 'Nombre',
    },
    lastName: {
      en: 'Last name',
      es: 'Apellido',
    },
    company: {
      en: 'Company',
      es: 'Negocio',
    },
    addressLine1: {
      en: 'Address line 1',
      es: 'Dirección 1',
    },
    addressLine2: {
      en: 'Address line 2',
      es: 'Dirección 2',
    },
    city: {
      en: 'City',
      es: 'Ciudad',
    },
    state: {
      en: 'State / Province',
      es: 'Estado / Provincia',
    },
    zip: {
      en: 'Zip / Postal Code',
      es: 'Código postal',
    },
    country: {
      en: 'Country',
      es: 'País',
    },
    phone: {
      en: 'Phone',
      es: 'Teléfono móvil',
    },
    setAsDefaultAddress: {
      en: 'Set as default address',
      es: 'Establecer como dirección por defecto',
    },
    save: {
      en: 'Save',
      es: 'Guardar',
    },
    cancel: {
      en: 'Cancel',
      es: 'Cancelar',
    },
  };

  return (
    <>
      <Text className="mt-4 mb-6" as="h3" size="lead">
        {isNewAddress
          ? editTranslations.addAddress[lang]
          : editTranslations.editAddress[lang]}
      </Text>
      <div className="max-w-lg">
        <form noValidate onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-red-100 rounded">
              <p className="m-4 text-sm text-red-900">{submitError}</p>
            </div>
          )}
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="firstname"
              name="firstname"
              required
              type="text"
              autoComplete="given-name"
              placeholder={editTranslations.firstName[lang]}
              aria-label={editTranslations.firstName[lang]}
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="lastname"
              name="lastname"
              required
              type="text"
              autoComplete="family-name"
              placeholder={editTranslations.lastName[lang]}
              aria-label={editTranslations.lastName[lang]}
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={editTranslations.company[lang]}
              aria-label={editTranslations.company[lang]}
              value={company}
              onChange={(event) => {
                setCompany(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="street1"
              name="street1"
              type="text"
              autoComplete="address-line1"
              placeholder={editTranslations.addressLine1[lang]}
              required
              aria-label={editTranslations.addressLine1[lang]}
              value={address1}
              onChange={(event) => {
                setAddress1(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="address2"
              name="address2"
              type="text"
              autoComplete="address-line2"
              placeholder={editTranslations.addressLine2[lang]}
              aria-label={editTranslations.addressLine2[lang]}
              value={address2}
              onChange={(event) => {
                setAddress2(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="city"
              name="city"
              type="text"
              required
              autoComplete="address-level2"
              placeholder={editTranslations.city[lang]}
              aria-label={editTranslations.city[lang]}
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="state"
              name="state"
              type="text"
              autoComplete="address-level1"
              placeholder={editTranslations.state[lang]}
              required
              aria-label={editTranslations.state[lang]}
              value={province}
              onChange={(event) => {
                setProvince(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="zip"
              name="zip"
              type="text"
              autoComplete="postal-code"
              placeholder={editTranslations.zip[lang]}
              required
              aria-label={editTranslations.zip[lang]}
              value={zip}
              onChange={(event) => {
                setZip(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="country"
              name="country"
              type="text"
              autoComplete="country-name"
              placeholder={editTranslations.country[lang]}
              required
              aria-label={editTranslations.country[lang]}
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />
          </div>
          <div className="mt-3">
            <input
              className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline border-gray-500 rounded`}
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder={editTranslations.phone[lang]}
              aria-label={editTranslations.phone[lang]}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
              }}
            />
          </div>
          <div className="mt-4">
            <input
              type="checkbox"
              value=""
              name="defaultAddress"
              id="defaultAddress"
              checked={isDefaultAddress}
              className="border-gray-500 rounded-sm cursor-pointer border-1"
              onChange={() => setIsDefaultAddress(!isDefaultAddress)}
            />
            <label
              className="inline-block ml-2 text-sm cursor-pointer"
              htmlFor="defaultAddress"
            >
              {editTranslations.setAsDefaultAddress[lang]}
            </label>
          </div>
          <div className="mt-8">
            <Button
              className="w-full rounded focus:shadow-outline"
              type="submit"
              variant="primary"
              disabled={saving}
            >
              {editTranslations.save[lang]}
            </Button>
          </div>
          <div>
            <Button
              className="w-full mt-2 rounded focus:shadow-outline"
              variant="secondary"
              onClick={close}
            >
              {editTranslations.cancel[lang]}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export async function callUpdateAddressApi({
  id,
  firstName,
  lastName,
  company,
  address1,
  address2,
  country,
  province,
  city,
  phone,
  zip,
  isDefaultAddress,
}: {
  id: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  province: string;
  city: string;
  phone: string;
  zip: string;
  isDefaultAddress: boolean;
}) {
  try {
    const res = await fetch(
      id ? `/account/address/${encodeURIComponent(id)}` : '/account/address',
      {
        method: id ? 'PATCH' : 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          company,
          address1,
          address2,
          country,
          province,
          city,
          phone,
          zip,
          isDefaultAddress,
        }),
      },
    );
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error saving address. Please try again.',
    };
  }
}
