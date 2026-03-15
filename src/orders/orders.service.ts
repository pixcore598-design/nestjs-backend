import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, OrderQueryDto } from './order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  // 创建订单
  async create(dto: CreateOrderDto, buyerId: number) {
    // 检查资产是否存在
    const asset = await this.prisma.asset.findUnique({
      where: { id: dto.assetId },
    });

    if (!asset) {
      throw new NotFoundException('资产不存在');
    }

    if (asset.status === 'sold') {
      throw new BadRequestException('该资产已售出');
    }

    if (asset.creatorId === buyerId) {
      throw new BadRequestException('不能购买自己的资产');
    }

    // 创建订单
    const order = await this.prisma.order.create({
      data: {
        amount: dto.amount || asset.price,
        currency: dto.currency || asset.currency,
        buyerId,
        assetId: dto.assetId,
      },
      include: {
        asset: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            price: true,
          },
        },
        buyer: {
          select: {
            id: true,
            username: true,
            nickname: true,
          },
        },
      },
    });

    // 自动更新资产状态为已售出
    await this.prisma.asset.update({
      where: { id: dto.assetId },
      data: { status: 'sold' },
    });

    return order;
  }

  // 获取订单列表
  async findAll(userId: number, query: OrderQueryDto) {
    const page = query.page ? +query.page : 1;
    const limit = query.limit ? +query.limit : 10;
    const skip = (page - 1) * limit;

    const where: any = {
      buyerId: userId,
    };

    if (query.status) {
      where.status = query.status;
    }

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          asset: {
            select: {
              id: true,
              title: true,
              thumbnail: true,
              price: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      data: orders,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // 获取单个订单
  async findOne(id: number, userId: number) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        buyerId: userId,
      },
      include: {
        asset: {
          select: {
            id: true,
            title: true,
            thumbnail: true,
            price: true,
            description: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    return order;
  }

  // 更新订单状态（取消订单）
  async updateStatus(id: number, userId: number, status: string) {
    const order = await this.prisma.order.findFirst({
      where: {
        id,
        buyerId: userId,
      },
    });

    if (!order) {
      throw new NotFoundException('订单不存在');
    }

    if (order.status !== 'pending') {
      throw new BadRequestException('只能取消待支付的订单');
    }

    // 更新订单状态
    const updatedOrder = await this.prisma.order.update({
      where: { id },
      data: { status },
    });

    // 如果取消订单，恢复资产状态
    if (status === 'cancelled') {
      await this.prisma.asset.update({
        where: { id: order.assetId },
        data: { status: 'published' },
      });
    }

    return updatedOrder;
  }
}