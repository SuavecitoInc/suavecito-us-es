import {useState} from 'react';

import {emailValidation} from '~/lib/utils';

const recover_form: {[key: string]: any} = {
  submit_success: {
    request_sent: {
      EN: 'Request Sent.',
      ES: 'Solicitud enviada.',
    },
    message: {
      EN: 'If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.',
      ES: 'Si esa dirección de correo electrónico está en nuestro sistema, recibirá un correo electrónico con instrucciones sobre cómo restablecer su contraseña en unos pocos minutos.',
    },
  },
  title: {
    EN: 'Forgot Password.',
    ES: 'Has olvidado tu contraseña',
  },
  sub_title: {
    EN: 'Enter the email address associated with your account to receive a link to reset your password.',
    ES: 'Ingrese la dirección de correo electrónico asociada con su cuenta para recibir un enlace para restablecer su contraseña.',
  },
  email_address: {
    EN: 'Email address',
    ES: 'Correo electrónico',
  },
  button: {
    request_reset: {
      EN: 'Request Reset Link',
      ES: 'Solicitar Restablecimiento de Contraseña',
    },
  },
};

interface FormElements {
  email: HTMLInputElement;
}

export function AccountRecoverForm({lang = 'EN'}: {lang?: 'EN' | 'ES'}) {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    event.preventDefault();

    setEmailError(null);
    setSubmitError(null);

    const newEmailError = emailValidation(event.currentTarget.email);

    if (newEmailError) {
      setEmailError(newEmailError);
      return;
    }

    await callAccountRecoverApi({
      email,
    });

    setEmail('');
    setSubmitSuccess(true);
  }

  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        {submitSuccess ? (
          <>
            <h1 className="text-4xl">
              {recover_form.submit_success.request_sent[lang]}
            </h1>
            <p className="mt-4">{recover_form.submit_success.message[lang]}</p>
          </>
        ) : (
          <>
            <h1 className="text-4xl">{recover_form.title[lang]}</h1>
            <p className="mt-4">{recover_form.sub_title[lang]}</p>
          </>
        )}
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1 rounded appearance-none border w-full py-2 px-3 text-primary/90 placeholder:text-primary/50 leading-tight focus:shadow-outline ${
                emailError ? ' border-red-500' : 'border-gray-900'
              }`}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder={recover_form.email_address[lang]}
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
              {recover_form.button.request_reset[lang]}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callAccountRecoverApi({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}) {
  try {
    const res = await fetch(`/account/recover`, {
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
