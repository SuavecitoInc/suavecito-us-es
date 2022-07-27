import {
  IconFacebook,
  IconInstagram,
  IconTwitter,
  IconTiktok,
  IconYoutube,
} from '~/components';

import React, {useRef} from 'react';

export function SubscribeEmail() {
  const formRef = useRef<HTMLFormElement>(null);

  const submitForm = (evt: React.FormEvent<HTMLFormElement>) => {
    if (!formRef.current?.checkValidity()) {
      return;
    }
    evt.preventDefault();
    console.log('submitted');
  };

  return (
    <>
      <div>
        <form ref={formRef} onSubmit={(evt) => submitForm(evt)}>
          <input type="email" placeholder="Email Address" required />
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
