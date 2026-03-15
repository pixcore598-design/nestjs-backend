export class Asset {
  id: number;
  title: string;
  description: string | null;
  type: string;
  url: string;
  thumbnail: string | null;
  price: number;
  currency: string;
  status: string;
  tags: string | null;
  views: number;
  likes: number;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}

export class AssetResponse {
  id: number;
  title: string;
  description: string | null;
  type: string;
  url: string;
  thumbnail: string | null;
  price: number;
  currency: string;
  status: string;
  tags: string[] | null;
  views: number;
  likes: number;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<AssetResponse>) {
    Object.assign(this, partial);
    // 解析tags JSON字符串
    if (this.tags && typeof this.tags === 'string') {
      try {
        this.tags = JSON.parse(this.tags);
      } catch {
        this.tags = [];
      }
    }
  }
}

export class AssetListResponse {
  data: AssetResponse[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;

  constructor(partial: Partial<AssetListResponse>) {
    Object.assign(this, partial);
  }
}