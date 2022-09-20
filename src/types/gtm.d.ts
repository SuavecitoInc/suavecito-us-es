declare module '@analytics/google-tag-manager';

export interface ViewedProductPayload {
  Brand: string;
  CompareAtPrice: null | number;
  ImageUrl: string;
  Name: string;
  Price: null | number;
  ProductID: string;
  SKU: string;
  ProductType: string;
}

export interface LineItem {
  attributes: undefined | string;
  merchandiseId: string;
  quantity: number;
  sellingPlanId: undefined | string;
}

export interface CartLineItem {
  attributes: undefined | string;
  cost: {
    subTotalAmount: {
      currencyCode: string;
      amount: string;
    };
    totalAmount: {
      currencyCode: string;
      amount: string;
    };
  };
  id: string;
  merchandise: {
    availableForSale: boolean;
    compareAtPriceV2: null | string;
    id: string;
    image: {
      id: string;
      url: string;
    };
    priceV2: {
      currencyCode: string;
      amount: string;
    };
    product: {
      handle: string;
      title: string;
      id: string;
    };
    requiresShipping: boolean;
    selectedOptions: {name: string; value: string}[];
    title: string;
  };
  quantity: number;
}

export interface HydrogenAddToCartPayload {
  addedCartLines: LineItem[];
  cart: {
    attributes: any[];
    buyerIdentity: {
      countryCode: string;
      customer: string;
      email: string;
      phone: string;
    };
    checkoutUrl: string;
    cost: {
      subTotalAmount: {
        currencyCode: string;
        amount: string;
      };
      totalAmount: {
        currencyCode: string;
        amount: string;
      };
    };
    discountCodes: string[];
    id: string;
    lines: {
      edges: {
        node: CartLineItem;
      }[];
    };
    note: string;
    totalQuantity: number;
  };
}
