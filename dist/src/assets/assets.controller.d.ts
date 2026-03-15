import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto, AssetQueryDto } from './assets.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(dto: CreateAssetDto, req: any): Promise<import("./assets.entity").AssetResponse>;
    findAll(query: AssetQueryDto): Promise<import("./assets.entity").AssetListResponse>;
    getMyAssets(req: any, page?: number, limit?: number): Promise<import("./assets.entity").AssetListResponse>;
    findOne(id: number): Promise<import("./assets.entity").AssetResponse>;
    update(id: number, dto: UpdateAssetDto, req: any): Promise<import("./assets.entity").AssetResponse>;
    delete(id: number, req: any): Promise<{
        success: boolean;
        message: string;
    }>;
    like(id: number): Promise<import("./assets.entity").AssetResponse>;
}
