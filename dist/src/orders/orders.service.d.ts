import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderQueryDto } from './order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateOrderDto, buyerId: number): Promise<{
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
    findAll(userId: number, query: OrderQueryDto): Promise<{
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
    findOne(id: number, userId: number): Promise<{
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
    updateStatus(id: number, userId: number, status: string): Promise<{
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
