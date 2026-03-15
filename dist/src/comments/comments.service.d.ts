import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './comment.dto';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCommentDto, userId: number): Promise<{
        user: {
            username: string;
            nickname: string | null;
            avatar: string | null;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        assetId: number;
        userId: number;
    }>;
    findByAsset(assetId: number): Promise<({
        user: {
            username: string;
            nickname: string | null;
            avatar: string | null;
            id: number;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        assetId: number;
        userId: number;
    })[]>;
    delete(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        assetId: number;
        userId: number;
    }>;
}
