export interface IdentifyCustomerGTMPayload {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ViewedProductGTMPayload {
  Brand: string;
  CompareAtPrice: string | number;
  ImageUrl: string;
  Name: string;
  Price: string | number;
  ProductID: string;
  SKU: string;
  ProductType: string;
}

export interface RecentlyViewedProductGTMPayload {
  Categories: string;
  ImageUrl: string;
  ItemId: string;
  Metadata: {
    Brand: string;
    Price: string | number;
    CompareAtPrice: string | number;
  };
  Title: string;
  Url: string;
}

export interface AddToCartGTMPayload {
  cart: {
    cost: {
      subtotalAmount: {
        amount: string;
      };
      totalAmount: {
        amount: string;
      };
    };
    lines: any[];
  };
}
