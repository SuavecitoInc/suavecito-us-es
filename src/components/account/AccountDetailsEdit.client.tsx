import {useState} from 'react';

import {Text, Button} from '~/components';
import {
  emailValidation,
  passwordValidation,
  useRenderServerComponents,
} from '~/lib/utils';

interface FormElements {
  firstName: HTMLInputElement;
  lastName: HTMLInputElement;
  phone: HTMLInputElement;
  email: HTMLInputElement;
  currentPassword: HTMLInputElement;
  newPassword: HTMLInputElement;
  newPassword2: HTMLInputElement;
}

export function AccountDetailsEdit({
  firstName: _firstName = '',
  lastName: _lastName = '',
  phone: _phone = '',
  email: _email = '',
  close,
  lang = 'en',
}: {
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  close: () => void;
  lang?: 'en' | 'es';
}) {
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(_firstName);
  const [lastName, setLastName] = useState(_lastName);
  const [phone, setPhone] = useState(_phone);
  const [email, setEmail] = useState(_email);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [currentPasswordError, setCurrentPasswordError] = useState<
    null | string
  >(null);
  const [newPasswordError, setNewPasswordError] = useState<null | string>(null);
  const [newPassword2Error, setNewPassword2Error] = useState<null | string>(
    null,
  );
  const [submitError, setSubmitError] = useState<null | string>(null);

  // Necessary for edits to show up on the main page
  const renderServerComponents = useRenderServerComponents();

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    event.preventDefault();

    setEmailError(null);
    setCurrentPasswordError(null);
    setNewPasswordError(null);
    setNewPassword2Error(null);

    const emailError = emailValidation(event.currentTarget.email);
    if (emailError) {
      setEmailError(emailError);
    }

    let currentPasswordError, newPasswordError, newPassword2Error;

    // Only validate the password fields if the current password has a value
    if (event.currentTarget.currentPassword.value) {
      currentPasswordError = passwordValidation(
        event.currentTarget.currentPassword,
      );
      if (currentPasswordError) {
        setCurrentPasswordError(currentPasswordError);
      }

      newPasswordError = passwordValidation(event.currentTarget.newPassword);
      if (newPasswordError) {
        setNewPasswordError(newPasswordError);
      }

      newPassword2Error =
        event.currentTarget.newPassword.value !==
        event.currentTarget.newPassword2.value
          ? 'The two passwords entered did not match'
          : null;
      if (newPassword2Error) {
        setNewPassword2Error(newPassword2Error);
      }
    }

    if (
      emailError ||
      currentPasswordError ||
      newPasswordError ||
      newPassword2Error
    ) {
      return;
    }

    setSaving(true);

    const accountUpdateResponse = await callAccountUpdateApi({
      email,
      newPassword: event.currentTarget.newPassword.value,
      currentPassword: event.currentTarget.currentPassword.value,
      phone,
      firstName,
      lastName,
    });

    setSaving(false);

    if (accountUpdateResponse.error) {
      setSubmitError(accountUpdateResponse.error);
      return;
    }

    renderServerComponents();
    close();
  }

  const editTranslations = {
    updateYourProfile: {
      en: 'Update your profile',
      es: 'Actualice su perfil',
    },
    firstName: {
      en: 'First name',
      es: 'Nombre',
    },
    lastName: {
      en: 'Last name',
      es: 'Apellido',
    },
    phone: {
      en: 'Mobile',
      es: 'Teléfono móvil',
    },
    email: {
      en: 'Email',
      es: 'Correo electrónico',
    },
    changeYourPassword: {
      en: 'Change your password',
      es: 'Cambie su contraseña',
    },
    currentPassword: {
      en: 'Current password',
      es: 'Contraseña actual',
    },
    newPassword1: {
      en: 'New password',
      es: 'Nueva contraseña',
    },
    newPassword2: {
      en: 'Re-enter new password',
      es: 'Vuelva a introducir su nueva contraseña',
    },
    passwordMustBe: {
      en: 'Passwords must be at least 6 characters.',
      es: 'La contraseña debe tener al menos 6 caracteres.',
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
        {editTranslations.updateYourProfile[lang]}
      </Text>
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
        <div className="mt-3">
          <input
            className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline rounded ${
              emailError ? ' border-red-500' : 'border-gray-500'
            }`}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={editTranslations.email[lang]}
            aria-label={editTranslations.email[lang]}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <p
            className={`text-red-500 text-xs ${!emailError ? 'invisible' : ''}`}
          >
            {emailError} &nbsp;
          </p>
        </div>
        <Text className="mb-6 mt-6" as="h3" size="lead">
          {editTranslations.changeYourPassword[lang]}
        </Text>
        <Password
          name="currentPassword"
          label={editTranslations.currentPassword[lang]}
          passwordError={currentPasswordError}
        />
        <Password
          name="newPassword"
          label={editTranslations.newPassword1[lang]}
          passwordError={newPasswordError}
        />
        <Password
          name="newPassword2"
          label={editTranslations.newPassword2[lang]}
          passwordError={newPassword2Error}
        />
        <Text
          size="fine"
          color="subtle"
          className={`mt-1 ${
            currentPasswordError || newPasswordError ? 'text-red-500' : ''
          }`}
        >
          {editTranslations.passwordMustBe[lang]}
        </Text>
        {newPassword2Error ? <br /> : null}
        <Text
          size="fine"
          className={`mt-1 text-red-500 ${
            newPassword2Error ? '' : 'invisible'
          }`}
        >
          {newPassword2Error} &nbsp;
        </Text>
        <div className="mt-6">
          <Button
            className="text-sm mb-2"
            variant="primary"
            width="full"
            type="submit"
            disabled={saving}
          >
            {editTranslations.save[lang]}
          </Button>
        </div>
        <div className="mb-4">
          <Button
            type="button"
            className="text-sm"
            variant="secondary"
            width="full"
            onClick={close}
          >
            {editTranslations.cancel[lang]}
          </Button>
        </div>
      </form>
    </>
  );
}

function Password({
  name,
  passwordError,
  label,
}: {
  name: string;
  passwordError: string | null;
  label: string;
}) {
  const [password, setPassword] = useState('');

  return (
    <div className="mt-3">
      <input
        className={`appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline rounded ${
          passwordError ? ' border-red-500' : 'border-gray-500'
        }`}
        id={name}
        name={name}
        type="password"
        autoComplete={
          name === 'currentPassword' ? 'current-password' : undefined
        }
        placeholder={label}
        aria-label={label}
        value={password}
        minLength={8}
        required
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
    </div>
  );
}

export async function callAccountUpdateApi({
  email,
  phone,
  firstName,
  lastName,
  currentPassword,
  newPassword,
}: {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const res = await fetch(`/account`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        phone,
        firstName,
        lastName,
        currentPassword,
        newPassword,
      }),
    });
    if (res.ok) {
      return {};
    } else {
      return res.json();
    }
  } catch (_e) {
    return {
      error: 'Error saving account. Please try again.',
    };
  }
}
