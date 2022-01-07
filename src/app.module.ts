import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose'
import { MongoProductModule } from './mongoProduct/mongoProduct.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductModule,
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestjs'
    ),
    MongoProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
