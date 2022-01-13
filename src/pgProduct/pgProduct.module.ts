import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PgProduct from "./entities/pgProduct.entity";
import { PgProductController } from "./pgProduct.controller";
import { PgProductService } from "./pgProduct.service";

@Module({
    imports: [TypeOrmModule.forFeature([PgProduct])],
    controllers: [PgProductController],
    providers: [PgProductService],
})

export class PgProductModule {}