export interface Member {
  id: string;
  nationalId: string;
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
  product: Product;
  member: Member;
  event: EventDTO;
  quantity: number;
  shippingMethod: 'pickup' | 'someone' | 'shipping';
  someoneName?: string;
  shippingDetails?: {
    province: number;
    canton: number;
    zipCode: number;
    signals: string;
  }
}

export interface AddPurchase {
  memberId: string;
  productId: number;
  eventId: number;
  quantity: number;
  shippingMethod: 'pickup' | 'someone' | 'shipping';
  someoneName?: string | null;
  shippingDetails?: {
    province: number;
    canton: number;
    zipCode: number;
    signals: string;
  } | null
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
  members: Member[];
}

export class EditEventDTO {
  name!: string;
  date!: Date;
}

export interface SearchResult {
  id: string | number;
  name: string;
}

interface IdName {
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
