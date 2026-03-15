import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  // 创建评论
  async create(dto: CreateCommentDto, userId: number) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        userId,
        assetId: dto.assetId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nickname: true,
            avatar: true,
          },
        },
      },
    });
  }

  // 获取资产的所有评论
  async findByAsset(assetId: number) {
    return this.prisma.comment.findMany({
      where: { assetId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            nickname: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // 删除评论
  async delete(id: number, userId: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new NotFoundException('评论不存在');
    }

    if (comment.userId !== userId) {
      throw new NotFoundException('无权限删除此评论');
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }
}