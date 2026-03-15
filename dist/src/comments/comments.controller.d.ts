import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(dto: CreateCommentDto, req: any): Promise<{
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
    delete(id: number, req: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        assetId: number;
        userId: number;
    }>;
}
