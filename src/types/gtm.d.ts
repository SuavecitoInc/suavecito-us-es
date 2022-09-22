export interface IdentifyCustomerGTMPayload {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ViewedProductGTMPayload {
  brand: string;
  compareAtPrice: string | number;
  imageUrl: string;
  name: string;
  price: string | number;
  productId: string;
  sku: string;
  productType: string;
}

export interface RecentlyViewedProductGTMPayload {
  categories: string;
  imageUrl: string;
  itemId: string;
  metadata: {
    brand: string;
    price: string | number;
    compareAtPrice: string | number;
  };
  title: string;
  url: string;
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
  title: string;
}
