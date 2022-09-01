import {HydrogenApiRoute} from '@shopify/hydrogen';
import {Buffer} from 'buffer';

declare global {
  const Oxygen: {env: any; [key: string]: any};
}

export const api: HydrogenApiRoute = async (request, options) => {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;
  const fromSender = LANG === 'es' ? 'Suavecito ES' : 'Suavecito';
  const json = await request.json();
  const name: string = json.name;
  const email: string = json.email;
  const phone: string = json.phone;
  const message: string = json.message;
  const zendeskEndpoint = Oxygen.env.ZENDESK_ENDPOINT;
  const zendeskEmail = Oxygen.env.ZENDESK_EMAIL;
  const zendeskToken = Oxygen.env.ZENDESK_TOKEN;
  const ticket = {
    comment: {
      body: `From: ${name}\n
      Email: ${email}\n
      Number: ${phone}\n 
      Message: ${message}`,
    },
    subject: `Message from ${fromSender} contact form`,
    tags: ['suavecito_es'],
    requester: {
      name,
      email,
    },
    group_id: 1500002445741,
  };
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization:
        'Basic ' +
        Buffer.from(zendeskEmail + '/token:' + zendeskToken).toString('base64'),
    },
    body: JSON.stringify({ticket}),
  };
  const response = await fetch(zendeskEndpoint, fetchOptions);
  if (response.ok) {
    return new Response('Success', {
      status: 200,
    });
  }
  return new Response('Failure sending data to zendesk', {
    status: 404,
  });
};
