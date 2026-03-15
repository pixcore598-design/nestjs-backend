import { IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  assetId: number;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  currency?: string;
}

export class OrderQueryDto {
  @IsOptional()
  status?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}