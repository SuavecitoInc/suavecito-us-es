import {HydrogenApiRoute} from '@shopify/hydrogen';
import {fetchSync} from '@shopify/hydrogen';
// import fetch from 'node-fetch';

export const api: HydrogenApiRoute = async (request, options) => {
  const json = await request.json();
  const body = json.body;
  console.log(json);
  const email: string = json.email;
  const phone: string = json.phone;
  console.log(email, phone);
  const LIST_ID = 'T94qDB';
  const KLAVIYO_API_KEY = 'pk_8cb6306dbdd35be211a0cb24295812054a';
  const url = `https://a.klaviyo.com/api/v2/list/${LIST_ID}/subscribe?api_key=${KLAVIYO_API_KEY}`;
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      profiles: [
        {
          email,
          phone,
        },
      ],
    }),
  };
  console.log('fetching');
  const response = await fetch(url, fetchOptions);
  console.log('response', response);
  if (response.ok) {
    return new Response('Success', {
      status: 200,
    });
  }
  return new Response('Failure sending data to klaviyo', {
    status: 404,
  });
  //
};
