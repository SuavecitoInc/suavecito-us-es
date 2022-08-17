import React, {useRef, useState} from 'react';
import RPI from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {BrandTheme} from '~/types/suavecito';
import {footerData} from '~/locale';

// @ts-ignore
const PhoneInput = RPI.default ? RPI.default : RPI;

export function SubscribeEmail({
  lang = 'en',
  theme,
}: {
  lang?: 'en' | 'es';
  theme?: BrandTheme;
}) {
  const formRef = useRef<HTMLFormElement>(null);

  const formOutcomeRef = useRef<HTMLParagraphElement | null>(null);

  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const [emailInput, setEmailInput] = useState<string>('');

  const [phoneInput, setPhoneInput] = useState<string>('');

  const [allowPhone, setAllowPhone] = useState<boolean>(false);

  const mainColor = theme === 'suavecita' ? 'suavecita' : 'suavecito';
  const buttonStyles = {
    suavecito: 'bg-suave-red',
    suavecita: 'bg-suave-pink',
  };
  const buttonHoverStyles = {
    suavecito: 'hover:bg-suave-red-focus',
    suavecita: 'hover:bg-suave-pink-focus',
  };
  const pColor = {
    suavecito: '',
    suavecita: 'text-white',
  };

  const validPhoneRegex = /^([0|+[0-9]{1,5})?([0-9]{10})$/;
  const fetchReq = async (email: string, phone: string) => {
    const phonePayload = allowPhone === true ? phone : '';
    try {
      const headers: HeadersInit = new Headers({
        'Content-Type': 'application/json',
      });
      const params: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({email, phone: phonePayload}),
      };
      const response = await fetch('/api/subscribeKlaviyo', params);
      return response;
    } catch (error) {
      throw new Error('Something went wrong when subscribing to Klaviyo');
    }
  };

  const checkPhoneInput = (num: string, country: any) => {
    setPhoneInput(num);
    if (num === country.dialCode) {
      setAllowPhone(false);
      buttonRef.current?.classList.remove('btn-disabled');
      return;
    }
    if (validPhoneRegex.test(num)) {
      setAllowPhone(true);
      buttonRef.current?.classList.remove('btn-disabled');
    } else {
      buttonRef.current?.classList.add('btn-disabled');
    }
  };

  const submitForm = async (evt: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      return;
    }
    evt.preventDefault();
    const res = await fetchReq(emailInput, phoneInput);
    if (res.ok) {
      if (formOutcomeRef && formOutcomeRef.current) {
        formOutcomeRef.current.classList.add('text-green-600');
        formOutcomeRef.current.textContent = 'Form has been sent successfully!';
        const addBorders = formRef.current?.querySelectorAll('.klaviyo-input');
        addBorders.forEach((el) => {
          el.classList.add('border-solid');
          el.classList.add('border-green-600');
          el.classList.add('border-2');
        });
      }
    } else {
      if (formOutcomeRef && formOutcomeRef.current) {
        formOutcomeRef.current.classList.add('text-red-500');
        formOutcomeRef.current.textContent = 'Error sending form';
        const addBorders = formRef.current?.querySelectorAll('.klaviyo-input');
        addBorders.forEach((el) => {
          el.classList.add('border-solid');
          el.classList.add('border-red-600');
          el.classList.add('border-2');
        });
      }
    }
  };

  return (
    <>
      <div className="mb-[20px]">
        <form ref={formRef} onSubmit={(evt) => submitForm(evt)}>
          <div className="flex flex-col">
            <div className="mb-[5px] w-full klaviyo-input">
              <input
                className="w-full border-none"
                type="email"
                placeholder={footerData.newsletter.email[lang]}
                onChange={(evt) => setEmailInput(evt.target.value)}
                required
              />
            </div>
            <div className="flex mb-[5px] klaviyo-input">
              <PhoneInput
                country={'us'}
                placeholder={footerData.newsletter.phone[lang]}
                value={phoneInput}
                onChange={(phoneInput: string, country: string) =>
                  checkPhoneInput(phoneInput, country)
                }
              />
              <button
                className={`btn inline-block font-medium text-center py-2 px-4 text-contrast w-auto uppercase ${buttonStyles[mainColor]} ${buttonHoverStyles[mainColor]}`}
                type="submit"
                ref={buttonRef}
              >
                {footerData.newsletter.submit[lang]}
              </button>
            </div>
            <div>
              <p
                className={`text-[12px] h-[18px] mb-[2px]`}
                ref={formOutcomeRef}
              ></p>
            </div>
            <div>
              <p
                className={`text-[10px] ${pColor[mainColor]}`}
                dangerouslySetInnerHTML={{
                  __html: footerData.newsletter.disclaimer[lang],
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
