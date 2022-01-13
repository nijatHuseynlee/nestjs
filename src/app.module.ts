import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose'
import { MongoProductModule } from './mongoProduct/mongoProduct.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { DatabaseModule } from './database.module';
import { PgProductModule } from './pgProduct/pgProduct.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASS: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
      })
    }),
    MongooseModule.forRoot(
      'mongodb://localhost:27017/nestjs'
    ),


    DatabaseModule,


    ProductModule,
    MongoProductModule,
    PgProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
