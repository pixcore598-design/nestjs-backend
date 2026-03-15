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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, buyerId) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: dto.assetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException('资产不存在');
        }
        if (asset.status === 'sold') {
            throw new common_1.BadRequestException('该资产已售出');
        }
        if (asset.creatorId === buyerId) {
            throw new common_1.BadRequestException('不能购买自己的资产');
        }
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
        await this.prisma.asset.update({
            where: { id: dto.assetId },
            data: { status: 'sold' },
        });
        return order;
    }
    async findAll(userId, query) {
        const page = query.page ? +query.page : 1;
        const limit = query.limit ? +query.limit : 10;
        const skip = (page - 1) * limit;
        const where = {
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
    async findOne(id, userId) {
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
            throw new common_1.NotFoundException('订单不存在');
        }
        return order;
    }
    async updateStatus(id, userId, status) {
        const order = await this.prisma.order.findFirst({
            where: {
                id,
                buyerId: userId,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('订单不存在');
        }
        if (order.status !== 'pending') {
            throw new common_1.BadRequestException('只能取消待支付的订单');
        }
        const updatedOrder = await this.prisma.order.update({
            where: { id },
            data: { status },
        });
        if (status === 'cancelled') {
            await this.prisma.asset.update({
                where: { id: order.assetId },
                data: { status: 'published' },
            });
        }
        return updatedOrder;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map