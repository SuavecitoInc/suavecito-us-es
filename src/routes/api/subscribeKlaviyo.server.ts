import {HydrogenApiRoute} from '@shopify/hydrogen';

// declare global {
//   const Oxygen: {env: any; [key: string]: any};
// }

export const api: HydrogenApiRoute = async (request, options) => {
  const json = await request.json();
  const email: string = json.email;
  const phone: string = json.phone;
  const LIST_ID = 'T94qDB';
  const KLAVIYO_API_KEY = Oxygen.env.KLAVIYO_API_KEY;
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
  const response = await fetch(url, fetchOptions);
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
