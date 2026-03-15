import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AssetsModule } from './assets/assets.module';
import { CommentsModule } from './comments/comments.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [UsersModule, AssetsModule, CommentsModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}