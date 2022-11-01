# Suavecito Hydrogen

> Based on the Hydrogen Demo Store by Shopify

Hydrogen is a React framework and SDK that you can use to build fast and dynamic Shopify custom storefronts.

[Check out the docs](https://shopify.dev/custom-storefronts/hydrogen)

[Run this template on StackBlitz](https://stackblitz.com/github/Shopify/hydrogen/tree/stackblitz/templates/demo-store)

## Getting started

**Setup:**
.env

```
SHOPIFY_STORE_DOMAIN="store.myshopify.com"
SHOPIFY_STOREFRONT_API_PUBLIC_TOKEN="TOKEN"
PUBLIC_LANGUAG_CODE_="EN or ES"
```

**Requirements:**

- Node.js version 16.5.0 or higher
- Yarn

To create a new Hydrogen app, run:

```bash
npm init @shopify/hydrogen
```

## Running the dev server

Then `cd` into the new directory and run:

```bash
npm install
npm run dev
```

Remember to update `hydrogen.config.js` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Previewing a production build

To run a local preview of your Hydrogen app in an environment similar to Oxygen, build your Hydrogen app and then run `npm run preview`:

```bash
npm run build
npm run preview
```

## FGWP

> disable
> /src/data/free-gift-with-purchase
