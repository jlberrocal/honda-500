export interface Member {
  id?: string;
  nationalId?: string;
  name: string;
  email: string;
  phone: string;
  plate: string;
  familyPhone: string;
  requestedDate: Date;
  addedDate: Date;
  province: string;
  purchases?: Purchase[];
}

export interface Purchase {
  id: number;
  member: Member;
  details: PurchaseDetail[];
}

export interface ShippingAddress {
  province: number;
  canton: number;
  zipCode: number;
  signals: string;
}

export type ShippingType = 'pickup' | 'someone' | 'shipping';

export interface PurchaseDetail {
  id: number;
  product: Product;
  member: Member;
  event: EventDTO;
  quantity: number;
  shippingMethod: ShippingType;
  someoneName?: string | null;
  shippingDetails?: ShippingAddress | null;
}

export interface AddPurchase {
  member: Pick<Member, 'id' | 'name' | 'phone'>;
  products: ProductDetails[];
  eventId: number;
  shippingMethod: ShippingType;
  someoneName?: string;
  shippingDetails?: ShippingAddress;
}

export interface AddPurchaseDTO {
  member: Pick<Member, 'id' | 'name' | 'phone'>;
  eventId: number;
  products: { productId: number; quantity: number }[];
  shippingMethod: string;
  someoneName?: string;
  shippingDetails?: ShippingAddress;
}

export interface ProductDetails {
  product: IdName;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  normalPrice: number;
  discountPercentage: string;
  totalPrice: number;
}

export interface EventDTO {
  id?: number;
  name: string;
  date: Date;
  purchases: Purchase[];
}

export class EditEventDTO {
  name!: string;
  date!: Date;
}

export interface SearchResult {
  id: string | number;
  name: string;
}

export interface IdName {
  id: number;
  name: string;
}

export interface District extends IdName {
  canton?: Canton;
}

export interface Canton extends IdName {
  districts: District[];
  province?: Province;
}

export interface Province extends IdName {
  cantons: Canton[];
}
