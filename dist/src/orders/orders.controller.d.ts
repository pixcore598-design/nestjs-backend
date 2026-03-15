import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderQueryDto } from './order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(dto: CreateOrderDto, req: any): Promise<{
        asset: {
            id: number;
            title: string;
            thumbnail: string | null;
            price: number;
        };
        buyer: {
            username: string;
            nickname: string | null;
            id: number;
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        assetId: number;
        amount: number;
        buyerId: number;
    }>;
    findAll(req: any, query: OrderQueryDto): Promise<{
        data: ({
            asset: {
                id: number;
                title: string;
                thumbnail: string | null;
                price: number;
            };
        } & {
            id: number;
            status: string;
            createdAt: Date;
            updatedAt: Date;
            currency: string;
            assetId: number;
            amount: number;
            buyerId: number;
        })[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findOne(id: number, req: any): Promise<{
        asset: {
            id: number;
            title: string;
            description: string | null;
            thumbnail: string | null;
            price: number;
        };
    } & {
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        assetId: number;
        amount: number;
        buyerId: number;
    }>;
    cancel(id: number, req: any): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        assetId: number;
        amount: number;
        buyerId: number;
    }>;
    pay(id: number, req: any): Promise<{
        id: number;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        currency: string;
        assetId: number;
        amount: number;
        buyerId: number;
    }>;
}
