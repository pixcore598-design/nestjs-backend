import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetDto, UpdateAssetDto, AssetQueryDto } from './assets.dto';
import { AssetResponse, AssetListResponse } from './assets.entity';

@Injectable()
export class AssetsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateAssetDto, creatorId: number) {
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

    return new AssetResponse({ ...asset, tags: asset.tags as any });
  }

  async findAll(query: AssetQueryDto) {
    const { type, status, search, creatorId, minPrice, maxPrice, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc' } = query;

    const where: any = {};

    if (type) where.type = type;
    if (status) where.status = status;
    if (creatorId) where.creatorId = creatorId;
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
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
      const response = new AssetResponse({ ...asset, tags: asset.tags as any });
      // 添加creator信息
      (response as any).creator = asset.creator;
      return response;
    });

    return new AssetListResponse({
      data: assetResponses,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  }

  async findOne(id: number) {
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
      throw new NotFoundException(`资产 #${id} 不存在`);
    }

    // 增加浏览量
    await this.prisma.asset.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    const response = new AssetResponse({ ...asset, tags: asset.tags as any });
    (response as any).creator = asset.creator;
    return response;
  }

  async update(id: number, dto: UpdateAssetDto, userId: number) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(`资产 #${id} 不存在`);
    }

    // 检查权限：只有创建者或管理员可以更新
    if (asset.creatorId !== userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user?.role !== 'admin') {
        throw new ForbiddenException('您没有权限修改此资产');
      }
    }

    const updateData: any = { ...dto };
    if (dto.tags) {
      updateData.tags = JSON.stringify(dto.tags);
    }

    const updated = await this.prisma.asset.update({
      where: { id },
      data: updateData,
    });

    return new AssetResponse({ ...updated, tags: updated.tags as any });
  }

  async delete(id: number, userId: number) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(`资产 #${id} 不存在`);
    }

    // 检查权限：只有创建者或管理员可以删除
    if (asset.creatorId !== userId) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (user?.role !== 'admin') {
        throw new ForbiddenException('您没有权限删除此资产');
      }
    }

    await this.prisma.asset.delete({
      where: { id },
    });

    return { success: true, message: '资产已删除' };
  }

  async getMyAssets(userId: number, page = 1, limit = 10) {
    return this.findAll({
      creatorId: userId,
      page,
      limit,
      sortBy: 'createdAt',
      sortOrder: 'desc',
    });
  }

  async like(id: number) {
    const asset = await this.prisma.asset.findUnique({
      where: { id },
    });

    if (!asset) {
      throw new NotFoundException(`资产 #${id} 不存在`);
    }

    const updated = await this.prisma.asset.update({
      where: { id },
      data: { likes: { increment: 1 } },
    });

    return new AssetResponse({ ...updated, tags: updated.tags as any });
  }
}