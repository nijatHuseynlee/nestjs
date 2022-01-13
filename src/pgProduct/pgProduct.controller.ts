import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from "@nestjs/common";
import { CreatePgProductDto } from "./dto/createPgProduct.dto";
import { FindAllPgProductDto } from "./dto/findAllPgProduct.dto";
import { UpdatePgProductDto } from "./dto/updatePgProduct.dto";
import PgProduct from "./entities/pgProduct.entity";
import { PgProductService } from "./pgProduct.service";

@Controller('pgProducts')
export class PgProductController{

    constructor(private readonly pgProductService: PgProductService){}

    @Get()
    public findAll(
        @Query() query: FindAllPgProductDto
    ){
        return this.pgProductService.findAll(query);
    }

    @Get(':id')
    public findOne(
        @Param('id') id: number,
    ): Promise<PgProduct>
    {
        return this.pgProductService.findOne(id);
    }

    @Post()
    public create(
        @Body() createPgProductDto: CreatePgProductDto
    ): Promise<PgProduct>
    {
        return this.pgProductService.create(createPgProductDto);
    }

    @Put(':id')
    public update(
        @Param('id') id: number,
        @Body() updatePgProductDto: UpdatePgProductDto,
    )
    {
        return this.pgProductService.update(id, updatePgProductDto);
    }

    @Delete(':id')
    @HttpCode(204)
    public delete(
        @Param('id') id: number,
    )
    {
        return this.pgProductService.delete(id);
    }

}