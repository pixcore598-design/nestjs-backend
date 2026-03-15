export declare class CreateAssetDto {
    title: string;
    description?: string;
    type: string;
    url: string;
    thumbnail?: string;
    price: number;
    currency?: string;
    tags?: string[];
}
export declare class UpdateAssetDto {
    title?: string;
    description?: string;
    type?: string;
    url?: string;
    thumbnail?: string;
    price?: number;
    currency?: string;
    status?: string;
    tags?: string[];
}
export declare class AssetQueryDto {
    type?: string;
    status?: string;
    search?: string;
    creatorId?: number;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
