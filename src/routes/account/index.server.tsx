import {Suspense} from 'react';
import {
  CacheNone,
  ClientAnalytics,
  flattenConnection,
  gql,
  Seo,
  useSession,
  useLocalization,
  useShopQuery,
  type HydrogenRouteProps,
  type HydrogenRequest,
  type HydrogenApiRouteOptions,
} from '@shopify/hydrogen';

import {PRODUCT_CARD_FRAGMENT} from '~/lib/fragments';
import {getApiErrorMessage} from '~/lib/utils';
import {
  AccountAddressBook,
  AccountDetails,
  AccountOrderHistory,
  FeaturedCollections,
  LogoutButton,
  PageHeader,
  IdentifyCustomerEvent,
} from '~/components';
import {Layout, ProductSwimlane} from '~/components/index.server';
import type {
  Collection,
  CollectionConnection,
  Customer,
  MailingAddress,
  Order,
  Product,
  ProductConnection,
} from '@shopify/hydrogen/storefront-api-types';

export default function Account({response}: HydrogenRouteProps) {
  const LANG = import.meta.env.PUBLIC_LANGUAGE_CODE;
  response.cache(CacheNone());

  const {
    language: {isoCode: languageCode},
    country: {isoCode: countryCode},
  } = useLocalization();
  const {customerAccessToken} = useSession();

  if (!customerAccessToken) return response.redirect('/account/login');

  const {data} = useShopQuery<{
    customer: Customer;
    featuredCollections: CollectionConnection;
    featuredProducts: ProductConnection;
  }>({
    query: CUSTOMER_QUERY,
    variables: {
      customerAccessToken,
      language: languageCode,
      country: countryCode,
    },
    cache: CacheNone(),
  });

  const {customer, featuredCollections, featuredProducts} = data;

  if (!customer) return response.redirect('/account/login');

  const addresses = flattenConnection<MailingAddress>(customer.addresses).map(
    (address) => ({
      ...address,
      id: address.id!.substring(0, address.id!.lastIndexOf('?')),
      originalId: address.id,
    }),
  );

  const defaultAddress = customer?.defaultAddress?.id?.substring(
    0,
    customer.defaultAddress.id.lastIndexOf('?'),
  );

  const customerIdentification = {
    email: customer.email,
    firstName: customer.firstName,
    lastName: customer.lastName,
  };

  return (
    <>
      <AuthenticatedAccount
        lang={LANG}
        customer={customer}
        addresses={addresses}
        defaultAddress={defaultAddress}
        featuredCollections={
          flattenConnection<Collection>(featuredCollections) as Collection[]
        }
        featuredProducts={
          flattenConnection<Product>(featuredProducts) as Product[]
        }
      />
      <IdentifyCustomerEvent customerIdentification={customerIdentification} />
    </>
  );
}

function AuthenticatedAccount({
  customer,
  addresses,
  defaultAddress,
  featuredCollections,
  featuredProducts,
  lang = 'en',
}: {
  customer: Customer;
  addresses: any[];
  defaultAddress?: string;
  featuredCollections: Collection[];
  featuredProducts: Product[];
  lang?: 'en' | 'es';
}) {
  const orders = flattenConnection(customer?.orders) || [];

  const authAccountData = {
    welcome: {
      en: 'Welcome',
      es: 'Bienvenido',
    },
    welcomeToYourAccount: {
      en: 'Welcome to ypur account',
      es: 'Bienvenido a su cuenta',
    },
    accountDetails: {
      en: 'Account Details',
      es: 'Detalles de la cuenta',
    },
    signOut: {
      en: 'Sign out',
      es: 'Firmar la salida',
    },
  };

  const heading = customer
    ? customer.firstName
      ? `${authAccountData.welcome[lang]}, ${customer.firstName}.`
      : `${authAccountData.welcomeToYourAccount[lang]} .`
    : authAccountData.accountDetails[lang];

  return (
    <Layout>
      <Suspense>
        <Seo type="noindex" data={{title: 'Account details'}} />
      </Suspense>
      <PageHeader heading={heading}>
        <LogoutButton />
      </PageHeader>
      {orders && <AccountOrderHistory lang={lang} orders={orders as Order[]} />}
      <AccountDetails
        firstName={customer.firstName as string}
        lastName={customer.lastName as string}
        phone={customer.phone as string}
        email={customer.email as string}
        lang={lang}
      />
      <AccountAddressBook
        defaultAddress={defaultAddress}
        addresses={addresses}
        lang={lang}
      />
      {!orders && (
        <>
          <FeaturedCollections
            title="Popular Collections"
            data={featuredCollections}
          />
          <ProductSwimlane data={featuredProducts} />
        </>
      )}
    </Layout>
  );
}

export async function api(
  request: HydrogenRequest,
  {session, queryShop}: HydrogenApiRouteOptions,
) {
  if (request.method !== 'PATCH' && request.method !== 'DELETE') {
    return new Response(null, {
      status: 405,
      headers: {
        Allow: 'PATCH,DELETE',
      },
    });
  }

  if (!session) {
    return new Response('Session storage not available.', {
      status: 400,
    });
  }

  const {customerAccessToken} = await session.get();

  if (!customerAccessToken) return new Response(null, {status: 401});

  const {email, phone, firstName, lastName, newPassword} = await request.json();

  interface Customer {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    password?: string;
  }

  const customer: Customer = {};

  if (email) customer.email = email;
  if (phone) customer.phone = phone;
  if (firstName) customer.firstName = firstName;
  if (lastName) customer.lastName = lastName;
  if (newPassword) customer.password = newPassword;

  const {data, errors} = await queryShop<{customerUpdate: any}>({
    query: CUSTOMER_UPDATE_MUTATION,
    variables: {
      customer,
      customerAccessToken,
    },
    // @ts-expect-error `queryShop.cache` is not yet supported but soon will be.
    cache: CacheNone(),
  });

  const error = getApiErrorMessage('customerUpdate', data, errors);

  if (error) return new Response(JSON.stringify({error}), {status: 400});

  return new Response(null);
}

const CUSTOMER_QUERY = gql`
  ${PRODUCT_CARD_FRAGMENT}
  query CustomerDetails(
    $customerAccessToken: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customer(customerAccessToken: $customerAccessToken) {
      firstName
      lastName
      phone
      email
      defaultAddress {
        id
        formatted
      }
      addresses(first: 6) {
        edges {
          node {
            id
            formatted
            firstName
            lastName
            company
            address1
            address2
            country
            province
            city
            zip
            phone
          }
        }
      }
      orders(first: 250, sortKey: PROCESSED_AT, reverse: true) {
        edges {
          node {
            id
            orderNumber
            processedAt
            financialStatus
            fulfillmentStatus
            currentTotalPrice {
              amount
              currencyCode
            }
            lineItems(first: 2) {
              edges {
                node {
                  variant {
                    image {
                      url
                      altText
                      height
                      width
                    }
                  }
                  title
                }
              }
            }
          }
        }
      }
    }
    featuredProducts: products(first: 12) {
      nodes {
        ...ProductCard
      }
    }
    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

const CUSTOMER_UPDATE_MUTATION = gql`
  mutation customerUpdate(
    $customer: CustomerUpdateInput!
    $customerAccessToken: String!
  ) {
    customerUpdate(
      customer: $customer
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
