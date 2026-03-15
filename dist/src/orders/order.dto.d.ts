export declare class CreateOrderDto {
    assetId: number;
    amount: number;
    currency?: string;
}
export declare class OrderQueryDto {
    status?: string;
    page?: number;
    limit?: number;
}
