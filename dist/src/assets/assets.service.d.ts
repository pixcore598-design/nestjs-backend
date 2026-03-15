import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto, AssetQueryDto } from './assets.dto';
import { AssetResponse, AssetListResponse } from './assets.entity';
export declare class AssetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAssetDto, creatorId: number): Promise<AssetResponse>;
    findAll(query: AssetQueryDto): Promise<AssetListResponse>;
    findOne(id: number): Promise<AssetResponse>;
    update(id: number, dto: UpdateAssetDto, userId: number): Promise<AssetResponse>;
    delete(id: number, userId: number): Promise<{
        success: boolean;
        message: string;
    }>;
    getMyAssets(userId: number, page?: number, limit?: number): Promise<AssetListResponse>;
    like(id: number): Promise<AssetResponse>;
}
