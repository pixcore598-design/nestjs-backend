import { Controller, Get, Post, Delete, Body, Param, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './comment.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('api/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateCommentDto, @Request() req) {
    return this.commentsService.create(dto, req.user.id);
  }

  @Get('asset/:assetId')
  async findByAsset(@Param('assetId', ParseIntPipe) assetId: number) {
    return this.commentsService.findByAsset(assetId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.commentsService.delete(id, req.user.id);
  }
}