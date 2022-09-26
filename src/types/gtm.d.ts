export interface IdentifyCustomerEventPayload {
  email: string;
  firstName?: string;
  lastName?: string;
}

export interface ViewedProductEventPayload {
  brand: string;
  compareAtPrice: string | number;
  imageUrl: string;
  name: string;
  price: string | number;
  productId: string;
  sku: string;
  productType: string;
  title: string;
  vendor: string;
}

export interface RecentlyViewedProductEventPayload {
  categories: string;
  imageUrl: string;
  itemId: string;
  metadata: {
    Brand: string;
    Price: string | number;
    CompareAtPrice: null | string | number;
  };
  title: string;
  url: string;
}

export interface AddToCartEventPayload {
  addedCartLines: {
    merchandiseId: string;
  }[];
  cart: {
    cost: {
      subtotalAmount: {
        amount: string;
      };
      totalAmount: {
        amount: string;
      };
    };
    lines: {
      edges: any[];
    };
  };
  title: string;
}

export interface RemovedFromCartEventPayload {
  removedCartLines: any[];
  cart: {
    cost: {
      subtotalAmount: {
        amount: string;
      };
      totalAmount: {
        amount: string;
      };
    };
    lines: {
      edges: any[];
    };
  };
  prevCart: {
    lines: any[];
  };
  title: string;
}

export interface IdentifyCustomerGTMPayload {
  $email: string;
  $first_name?: string;
  $last_name?: string;
}
