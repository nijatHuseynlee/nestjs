import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { CreateMongoProductDto } from "./dto/createMongoProduct.dto";
import { FindAllMongoProductDto } from "./dto/findAllMongoProduct.dto";
import { UpdateMongoProductDto } from "./dto/updateMongoProduct.dto";
import { MongoProduct } from "./interfaces/mongoProduct.interface";
import { MongoProductService } from "./mongoProduct.service";

@Controller('mongoProducts')
export class MongoProductController
{
    constructor(private readonly mongoProductService: MongoProductService) {}

    @Get()
    async findAll(
        @Query() query: FindAllMongoProductDto
    ): Promise<MongoProduct[]>
    {
        return this.mongoProductService.findAll(query);
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string
    ): Promise<MongoProduct>
    {
        return this.mongoProductService.findOne(id);
    }

    @Post()
    async create(
        @Body() createMongoProductDto: CreateMongoProductDto
    ): Promise<MongoProduct>
    {
        return await this.mongoProductService.create(createMongoProductDto);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateMongoProductDto: UpdateMongoProductDto
    ): Promise<MongoProduct>
    {
        return await this.mongoProductService.update(id, updateMongoProductDto);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(
        @Param('id') id: string,
    ): Promise<void>
    {
        return await this.mongoProductService.delete(id);
    }
}