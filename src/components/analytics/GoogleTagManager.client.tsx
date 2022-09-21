import {useEffect} from 'react';
import Analytics from 'analytics';
import googleTagManager from '@analytics/google-tag-manager';

let init = false;
export function GTM() {
  useEffect(() => {
    if (!init) {
      console.log('GOOGLE TAG MANAGER INIT');
      // One-time initialization
      init = true;
      Analytics({
        app: 'hydrogen-app',
        plugins: [
          googleTagManager({
            containerId: 'GTM-WSNGBPW',
          }),
        ],
      });
    }
  });
  return null;
}
