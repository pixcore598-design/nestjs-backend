import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { AssetsService } from './assets.service';
import { CreateAssetDto, UpdateAssetDto, AssetQueryDto } from './assets.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('api/assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() dto: CreateAssetDto, @Request() req) {
    return this.assetsService.create(dto, req.user.id);
  }

  @Get()
  async findAll(@Query() query: AssetQueryDto) {
    return this.assetsService.findAll(query);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getMyAssets(
    @Request() req,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
  ) {
    return this.assetsService.getMyAssets(
      req.user.id,
      page ? +page : 1,
      limit ? +limit : 10,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssetDto,
    @Request() req,
  ) {
    return this.assetsService.update(id, dto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.assetsService.delete(id, req.user.id);
  }

  @Post(':id/like')
  async like(@Param('id', ParseIntPipe) id: number) {
    return this.assetsService.like(id);
  }
}