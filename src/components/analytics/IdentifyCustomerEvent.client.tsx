import {useEffect} from 'react';
import {ClientAnalytics} from '@shopify/hydrogen';
import {Maybe} from '@shopify/hydrogen/storefront-api-types';

export function IdentifyCustomerEvent({
  customerIdentification,
}: {
  customerIdentification: {
    email: Maybe<string> | undefined;
    firstName: Maybe<string> | undefined;
    lastName: Maybe<string> | undefined;
  };
}) {
  useEffect(() => {
    ClientAnalytics.publish('CUSTOM_IDENTIFY_CUSTOMER', true, {
      email: customerIdentification.email,
      firstName: customerIdentification.firstName,
      lastName: customerIdentification.lastName,
    });
  }, [customerIdentification]);

  return null;
}
