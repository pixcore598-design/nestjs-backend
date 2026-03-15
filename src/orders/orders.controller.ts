import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto, OrderQueryDto } from './order.dto';
import { JwtAuthGuard } from '../users/guards/jwt-auth.guard';

@Controller('api/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() dto: CreateOrderDto, @Request() req) {
    return this.ordersService.create(dto, req.user.id);
  }

  @Get()
  async findAll(@Request() req, @Query() query: OrderQueryDto) {
    return this.ordersService.findAll(req.user.id, query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.ordersService.findOne(id, req.user.id);
  }

  @Patch(':id/cancel')
  async cancel(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.ordersService.updateStatus(id, req.user.id, 'cancelled');
  }

  @Patch(':id/pay')
  async pay(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.ordersService.updateStatus(id, req.user.id, 'paid');
  }
}