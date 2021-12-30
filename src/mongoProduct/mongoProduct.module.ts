import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { MongoProductController } from "./mongoProduct.controller";
import { MongoProductSchema } from "./mongoProduct.scheme";
import { MongoProductService } from "./mongoProduct.service";


@Module({
    imports: [MongooseModule.forFeature([
        { name: 'MongoProduct', schema: MongoProductSchema }
    ])],
    controllers: [MongoProductController],
    providers: [MongoProductService],
})

export class MongoProductModule {}