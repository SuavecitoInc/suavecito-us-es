import {Seo} from '@shopify/hydrogen';
import {useState} from 'react';
import {Modal} from '../index';
import {AccountDetailsEdit} from './AccountDetailsEdit.client';

export function AccountDetails({
  firstName,
  lastName,
  phone,
  email,
  lang = 'en',
}: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  lang?: 'en' | 'es';
}) {
  const [isEditing, setIsEditing] = useState(false);

  const close = () => setIsEditing(false);

  const accountDetailsData = {
    accountDetails: {
      en: 'Account details',
      es: 'Detalles de la cuenta',
    },
    edit: {
      en: 'Edit',
      es: 'Editar',
    },
    profileSecurity: {
      en: 'Profile & Security',
      es: 'Perfil y Seguridad',
    },
    name: {
      en: 'Name',
      es: 'Nombre',
    },
    contact: {
      en: 'Contact',
      es: 'Contacto',
    },
    emailAddress: {
      en: 'Email address',
      es: 'Correo electrónico',
    },
    password: {
      en: 'Password',
      es: 'Contraseña',
    },
    addName: {
      en: 'Add name',
      es: 'Añadir nombre',
    },
    addMobile: {
      en: 'Add mobile',
      es: 'Añadir móvil',
    },
  };

  return (
    <>
      {isEditing ? (
        <Modal close={close}>
          <Seo type="noindex" data={{title: 'Account details'}} />
          <AccountDetailsEdit
            firstName={firstName}
            lastName={lastName}
            phone={phone}
            email={email}
            close={close}
            lang={lang}
          />
        </Modal>
      ) : null}
      <div className="grid w-full gap-4 p-4 py-6 md:gap-8 md:p-8 lg:p-12">
        <h3 className="font-bold text-lead">
          {accountDetailsData.accountDetails[lang]}
        </h3>
        <div className="lg:p-8 p-6 border border-gray-200 rounded">
          <div className="flex">
            <h3 className="font-bold text-base flex-1">
              {accountDetailsData.profileSecurity[lang]}
            </h3>
            <button
              className="underline text-sm font-normal"
              onClick={() => setIsEditing(true)}
            >
              {accountDetailsData.edit[lang]}
            </button>
          </div>
          <div className="mt-4 text-sm text-primary/50">
            {accountDetailsData.name[lang]}
          </div>
          <p className="mt-1">
            {firstName || lastName
              ? (firstName ? firstName + ' ' : '') + lastName
              : accountDetailsData.name[lang]}{' '}
          </p>

          <div className="mt-4 text-sm text-primary/50">
            {accountDetailsData.contact[lang]}
          </div>
          <p className="mt-1">{phone ?? accountDetailsData.addMobile[lang]}</p>

          <div className="mt-4 text-sm text-primary/50">
            {accountDetailsData.emailAddress[lang]}
          </div>
          <p className="mt-1">{email}</p>

          <div className="mt-4 text-sm text-primary/50">
            {accountDetailsData.password[lang]}
          </div>
          <p className="mt-1">**************</p>
        </div>
      </div>
    </>
  );
}
