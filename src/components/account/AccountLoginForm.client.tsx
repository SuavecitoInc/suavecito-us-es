import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';

const login_form: {[key: string]: any} = {
  email_address: {
    en: 'Email address',
    es: 'Correo electrónico',
  },
  button: {
    next: {
      en: 'Next',
      es: 'Continuar',
    },
    login: {
      en: 'Login',
      es: 'Iniciar',
    },
  },
  new_to: {
    en: 'New to',
    es: 'Nuevo a',
  },
  create_an_account: {
    en: 'Create an account',
    es: 'Crea una cuenta',
  },
  change_email: {
    en: 'Change email',
    es: 'Cambiar e-mail',
  },
  forgot_password: {
    en: 'Forgot password',
    es: 'Has olvidado tu contraseña',
  },
  errors: {
    valid_email: {
      en: 'Please enter a valid email',
      es: 'Por favor introduzca un correo electrónico válido',
    },
    enter_password: {
      en: 'Please enter a password',
      es: 'Porfavor ingrese una contraseña',
    },
    valid_password: {
      en: 'Passwords must be at least 6 characters',
      es: 'Las contraseñas deben tener al menos 6 caracteres',
    },
    submit_error: {
      en: 'Sorry we did not recognize either your email or password. Please try to sign in again or create a new account.',
      es: 'Lo sentimos, no reconocimos su correo electrónico o su contraseña. Intente iniciar sesión de nuevo o cree una cuenta nueva.',
    },
  },
};

interface FormElements {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export function AccountLoginForm({
  lang = 'EN',
  shopName,
}: {
  lang?: 'EN' | 'ES';
  shopName: string;
}) {
  const navigate = useNavigate();

  const [hasSubmitError, setHasSubmitError] = useState(false);
  const [showEmailField, setShowEmailField] = useState(true);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<null | string>(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState<null | string>(null);

  function onSubmit(event: React.FormEvent<HTMLFormElement & FormElements>) {
    event.preventDefault();

    setEmailError(null);
    setHasSubmitError(false);
    setPasswordError(null);

    if (showEmailField) {
      checkEmail(event);
    } else {
      checkPassword(event);
    }
  }

  function checkEmail(event: React.FormEvent<HTMLFormElement & FormElements>) {
    if (event.currentTarget.email.validity.valid) {
      setShowEmailField(false);
    } else {
      setEmailError(login_form.errors.valid_email[lang]);
    }
  }

  async function checkPassword(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    const validity = event.currentTarget.password.validity;
    if (validity.valid) {
      const response = await callLoginApi({
        email,
        password,
      });

      if (response.error) {
        setHasSubmitError(true);
        resetForm();
      } else {
        navigate('/account');
      }
    } else {
      setPasswordError(
        validity.valueMissing
          ? login_form.errors.enter_password[lang]
          : login_form.errors.valid_password[lang],
      );
    }
  }

  function resetForm() {
    setShowEmailField(true);
    setEmail('');
    setEmailError(null);
    setPassword('');
    setPasswordError(null);
  }

  const title = lang === 'ES' ? 'Iniciar' : 'Login';

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl uppercase text-center">{title}</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {hasSubmitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">
                {login_form.errors.submit_error[lang]}
              </p>
            </div>
          )}
          {showEmailField && (
            <EmailField
              lang={lang}
              shopName={shopName}
              email={email}
              setEmail={setEmail}
              emailError={emailError}
            />
          )}
          {!showEmailField && (
            <ValidEmail lang={lang} email={email} resetForm={resetForm} />
          )}
          {!showEmailField && (
            <PasswordField
              lang={lang}
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export async function callLoginApi({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const res = await fetch(`/account/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password}),
    });
    if (res.ok) {
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

function EmailField({
  lang,
  email,
  setEmail,
  emailError,
  shopName,
}: {
  lang: 'EN' | 'ES';
  email: string;
  setEmail: (email: string) => void;
  emailError: null | string;
  shopName: string;
}) {
  return (
    <>
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
          placeholder={login_form.email_address[lang]}
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
      <div className="flex items-center justify-between">
        <button
          className="bg-suave-red hover:bg-suave-red-focus rounded-sm text-contrast py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          {login_form.button.next[lang]}
        </button>
      </div>
      <div className="flex items-center mt-8 border-t  border-gray-300">
        <p className="align-baseline text-sm mt-6">
          {login_form.new_to[lang]} {shopName}? &nbsp;
          <Link className="inline underline" to="/account/register">
            {login_form.create_an_account[lang]}
          </Link>
        </p>
      </div>
    </>
  );
}

function ValidEmail({
  lang,
  email,
  resetForm,
}: {
  lang: 'EN' | 'ES';
  email: string;
  resetForm: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <div>
        <p>{email}</p>
        <input
          className="hidden"
          type="text"
          autoComplete="username"
          value={email}
          readOnly
        ></input>
      </div>
      <div>
        <button
          className="inline-block align-baseline text-sm underline"
          type="button"
          onClick={resetForm}
        >
          {login_form.change_email[lang]}
        </button>
      </div>
    </div>
  );
}

function PasswordField({
  lang,
  password,
  setPassword,
  passwordError,
}: {
  lang: 'EN' | 'ES';
  password: string;
  setPassword: (password: string) => void;
  passwordError: null | string;
}) {
  return (
    <>
      <div className="mb-3">
        <input
          className={`mb-1 appearance-none rounded border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline ${
            passwordError ? ' border-red-500' : 'border-gray-900'
          }`}
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          aria-label="Password"
          value={password}
          minLength={8}
          required
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {!passwordError ? (
          ''
        ) : (
          <p className={`text-red-500 text-xs`}> {passwordError} &nbsp;</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-suave-red hover:bg-suave-red-focus text-contrast rounded-sm py-2 px-4 focus:shadow-outline block w-full"
          type="submit"
        >
          {login_form.button.login[lang]}
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="flex-1"></div>
        <Link
          className="inline-block align-baseline text-sm text-primary/50"
          to="/account/recover"
        >
          {login_form.forgot_password[lang]}
        </Link>
      </div>
    </>
  );
}
