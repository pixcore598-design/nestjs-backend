export class Order {
  id: number;
  amount: number;
  currency: string;
  status: string;
  buyerId: number;
  assetId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class OrderResponse {
  id: number;
  amount: number;
  currency: string;
  status: string;
  buyerId: number;
  assetId: number;
  createdAt: Date;
  updatedAt: Date;
  asset?: {
    id: number;
    title: string;
    thumbnail: string | null;
    price: number;
  };
  buyer?: {
    id: number;
    username: string;
    nickname: string | null;
  };
}