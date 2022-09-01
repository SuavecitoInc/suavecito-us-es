import {Text, Button} from '~/components';
import React, {useState, useRef} from 'react';

export const contactFormData: {[key: string]: any} = {
  name: {
    en: 'Name',
    es: 'Nombre',
  },
  email: {
    en: 'Email Address',
    es: 'Correo Electrónico',
  },
  phone: {
    en: 'Mobile Phone',
    es: 'Teléfono Móvil',
  },
  message: {
    en: 'Message',
    es: 'Mensaje',
  },
  submit: {
    en: 'Submit',
    es: 'Enviar',
  },
  helpMsg: {
    en: 'How can we help?',
    es: '¿Cómo podemos ayudar?',
  },
  successMessage: {
    en: 'Your message has been sent successfully!',
    es: 'Su mensaje ha sido enviado con éxito.',
  },
  failureMessage: {
    en: 'An error occured while sending your message, please try again.',
    es: 'Se ha producido un error al enviar su mensaje, inténtelo de nuevo.',
  },
};

export function ContactForm({
  styles,
  lang = 'en',
}: {
  styles: {[key: string]: string};
  lang?: 'en' | 'es';
}) {
  const [emailInput, setEmailInput] = useState<string>('');
  const [phoneInput, setPhoneInput] = useState('');
  const [nameInput, setNameInput] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const responseRef = useRef<HTMLDivElement>(null);
  const fetchReq = async () => {
    try {
      const headers: HeadersInit = new Headers({
        'Content-Type': 'application/json',
      });
      const params: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify({
          email: emailInput,
          phone: phoneInput,
          name: nameInput,
          message: messageInput,
        }),
      };
      const response = await fetch('/api/submitContactForm', params);
      return response;
    } catch (error) {
      throw new Error('Something went wrong when submitting the contact form');
    }
  };
  const submitForm = async (evt: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      return;
    }
    evt.preventDefault();
    const res = await fetchReq();
    if (res.ok) {
      setEmailInput('');
      setMessageInput('');
      setNameInput('');
      setPhoneInput('');
      formRef.current.classList.add(
        'border-solid',
        'border',
        'border-green-500',
      );
      if (responseRef && responseRef.current) {
        responseRef.current.classList.add('!text-green-600');
        responseRef.current.textContent = contactFormData.successMessage[lang];
      }
    } else {
      formRef.current.classList.add('border-solid', 'border', 'border-red-500');
      if (responseRef && responseRef.current) {
        responseRef.current.classList.add('!text-red-500');
        responseRef.current.textContent = contactFormData.failureMessage[lang];
      }
    }
  };
  return (
    <form
      className={styles.card}
      onSubmit={(evt) => submitForm(evt)}
      ref={formRef}
    >
      <Text className={styles.textHeader} as={'p'}>
        {contactFormData.helpMsg[lang]}
      </Text>
      <div>
        <input
          className={styles.input}
          type="text"
          value={nameInput}
          placeholder={contactFormData.name[lang]}
          onChange={(evt) => setNameInput(evt.target.value)}
          required
        />
      </div>
      <div>
        <input
          className={styles.input}
          type="email"
          value={emailInput}
          placeholder={contactFormData.email[lang]}
          onChange={(evt) => setEmailInput(evt.target.value)}
          required
        />
      </div>
      <div>
        <input
          className={styles.input}
          type="tel"
          value={phoneInput}
          placeholder={contactFormData.phone[lang]}
          onChange={(evt) => setPhoneInput(evt.target.value)}
          required
        />
      </div>
      <div>
        <textarea
          className={`${styles.input} min-h-[120px]`}
          value={messageInput}
          placeholder={contactFormData.message[lang]}
          onChange={(evt) => setMessageInput(evt.target.value)}
          required
        />
      </div>
      <div className="flex justify-end">
        <Button className="btn">{contactFormData.submit[lang]}</Button>
      </div>
      <div>
        <p ref={responseRef} className="text-[1rem] mt-[10px]"></p>
      </div>
    </form>
  );
}
