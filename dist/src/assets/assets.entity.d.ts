export declare class Asset {
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
export declare class AssetResponse {
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
    constructor(partial: Partial<AssetResponse>);
}
export declare class AssetListResponse {
    data: AssetResponse[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    constructor(partial: Partial<AssetListResponse>);
}
