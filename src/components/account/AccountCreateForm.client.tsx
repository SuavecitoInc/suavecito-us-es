import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';

import {emailValidation, passwordValidation} from '~/lib/utils';

import {callLoginApi} from './AccountLoginForm.client';

const create_form: {[key: string]: any} = {
  title: {
    en: 'Create an account.',
    es: 'Crea una cuenta.',
  },
  placeholder: {
    email_address: {
      en: 'Email address',
      es: 'Correo electrónico',
    },
    password: {
      en: 'Password',
      es: 'Contraseña',
    },
  },
  button: {
    create_account: {
      en: 'Create Account',
      es: 'Crear Cuenta',
    },
  },
  already_have_account: {
    en: 'Already have an account?',
    es: '¿Ya tienes una cuenta?',
  },
  login: {
    en: 'Login',
    es: 'Iniciar',
  },
};

interface FormElements {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export function AccountCreateForm({lang = 'EN'}: {lang?: 'EN' | 'ES'}) {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<null | string>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<null | string>(null);

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    event.preventDefault();

    setEmailError(null);
    setPasswordError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);
    if (newEmailError) {
      setEmailError(newEmailError);
    }

    const newPasswordError = passwordValidation(event.currentTarget.password);
    if (newPasswordError) {
      setPasswordError(newPasswordError);
    }

    if (newEmailError || newPasswordError) {
      return;
    }

    const accountCreateResponse = await callAccountCreateApi({
      email,
      password,
    });

    if (accountCreateResponse.error) {
      setSubmitError(accountCreateResponse.error);
      return;
    }

    // this can be avoided if customerCreate mutation returns customerAccessToken
    await callLoginApi({
      email,
      password,
    });

    navigate('/account');
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">{create_form.title[lang]}</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1 appearance-none rounded border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline ${
                emailError ? ' border-red-500' : 'border-gray-900'
              }`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={create_form.placeholder.email_address[lang]}
              aria-label="Email address"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            {!emailError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{emailError} &nbsp;</p>
            )}
          </div>
          <div className="mb-3">
            <input
              className={`mb-1 appearance-none rounded border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline ${
                passwordError ? ' border-red-500' : 'border-gray-900'
              }`}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder={create_form.placeholder.password[lang]}
              aria-label="Password"
              value={password}
              minLength={8}
              required
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {!passwordError ? (
              ''
            ) : (
              <p className={`text-red-500 text-xs`}>{passwordError} &nbsp;</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-suave-red hover:bg-suave-red-focus text-contrast rounded-sm py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              {create_form.button.create_account[lang]}
            </button>
          </div>
          <div className="flex items-center mt-4">
            <p className="align-baseline text-sm">
              {create_form.already_have_account[lang]} &nbsp;
              <Link className="inline underline" to="/account">
                {create_form.login[lang]}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callAccountCreateApi({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    const res = await fetch(`/account/register`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password, firstName, lastName}),
    });
    if (res.status === 200) {
      return {};
    } else {
      return res.json();
    }
  } catch (error: any) {
    return {
      error: error.toString(),
    };
  }
}
