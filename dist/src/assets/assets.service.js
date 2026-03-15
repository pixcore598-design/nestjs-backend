"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const assets_entity_1 = require("./assets.entity");
let AssetsService = class AssetsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, creatorId) {
        const asset = await this.prisma.asset.create({
            data: {
                title: dto.title,
                description: dto.description,
                type: dto.type,
                url: dto.url,
                thumbnail: dto.thumbnail,
                price: dto.price,
                currency: dto.currency || 'CNY',
                tags: dto.tags ? JSON.stringify(dto.tags) : null,
                creatorId,
            },
        });
        return new assets_entity_1.AssetResponse({ ...asset, tags: asset.tags });
    }
    async findAll(query) {
        const { type, status, search, creatorId, minPrice, maxPrice, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;
        const where = {};
        if (type)
            where.type = type;
        if (status)
            where.status = status;
        if (creatorId)
            where.creatorId = creatorId;
        if (minPrice !== undefined || maxPrice !== undefined) {
            where.price = {};
            if (minPrice !== undefined)
                where.price.gte = minPrice;
            if (maxPrice !== undefined)
                where.price.lte = maxPrice;
        }
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.prisma.asset.findMany({
                where,
                orderBy: { [sortBy]: sortOrder },
                skip,
                take: limit,
                include: {
                    creator: {
                        select: {
                            id: true,
                            username: true,
                            nickname: true,
                            avatar: true,
                        },
                    },
                },
            }),
            this.prisma.asset.count({ where }),
        ]);
        const assetResponses = data.map(asset => {
            const response = new assets_entity_1.AssetResponse({ ...asset, tags: asset.tags });
            response.creator = asset.creator;
            return response;
        });
        return new assets_entity_1.AssetListResponse({
            data: assetResponses,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    }
    async findOne(id) {
        const asset = await this.prisma.asset.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        username: true,
                        nickname: true,
                        avatar: true,
                    },
                },
            },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`资产 #${id} 不存在`);
        }
        await this.prisma.asset.update({
            where: { id },
            data: { views: { increment: 1 } },
        });
        const response = new assets_entity_1.AssetResponse({ ...asset, tags: asset.tags });
        response.creator = asset.creator;
        return response;
    }
    async update(id, dto, userId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`资产 #${id} 不存在`);
        }
        if (asset.creatorId !== userId) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user?.role !== 'admin') {
                throw new common_1.ForbiddenException('您没有权限修改此资产');
            }
        }
        const updateData = { ...dto };
        if (dto.tags) {
            updateData.tags = JSON.stringify(dto.tags);
        }
        const updated = await this.prisma.asset.update({
            where: { id },
            data: updateData,
        });
        return new assets_entity_1.AssetResponse({ ...updated, tags: updated.tags });
    }
    async delete(id, userId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`资产 #${id} 不存在`);
        }
        if (asset.creatorId !== userId) {
            const user = await this.prisma.user.findUnique({ where: { id: userId } });
            if (user?.role !== 'admin') {
                throw new common_1.ForbiddenException('您没有权限删除此资产');
            }
        }
        await this.prisma.asset.delete({
            where: { id },
        });
        return { success: true, message: '资产已删除' };
    }
    async getMyAssets(userId, page = 1, limit = 10) {
        return this.findAll({
            creatorId: userId,
            page,
            limit,
            sortBy: 'createdAt',
            sortOrder: 'desc',
        });
    }
    async like(id) {
        const asset = await this.prisma.asset.findUnique({
            where: { id },
        });
        if (!asset) {
            throw new common_1.NotFoundException(`资产 #${id} 不存在`);
        }
        const updated = await this.prisma.asset.update({
            where: { id },
            data: { likes: { increment: 1 } },
        });
        return new assets_entity_1.AssetResponse({ ...updated, tags: updated.tags });
    }
};
exports.AssetsService = AssetsService;
exports.AssetsService = AssetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssetsService);
//# sourceMappingURL=assets.service.js.map