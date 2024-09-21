import { Member } from "@honda500/data-access";

export class PurchaseDTO {
  event: number;
  member: string;
  products: number[];
}

export interface AddPurchase {
  member: Partial<Member>;
  eventId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
  shippingMethod: 'pickup' | 'someone' | 'shipping';
  someoneName?: string | null;
  shippingDetails?: {
    province: number;
    canton: number;
    zipCode: number;
    signals: string;
  } | null;
}
