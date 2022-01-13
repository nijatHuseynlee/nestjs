import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePgProductDto } from "./dto/createPgProduct.dto";
import { FindAllPgProductDto } from "./dto/findAllPgProduct.dto";
import { UpdatePgProductDto } from "./dto/updatePgProduct.dto";
import PgProduct from "./entities/pgProduct.entity";


@Injectable()
export class PgProductService {
    constructor(
        @InjectRepository(PgProduct)
        private readonly pgProductRepository: Repository<PgProduct>
    ){}

    async findAll({ perPage, page, sort}: FindAllPgProductDto){
        const column = sort.replace(/^-/, '');
        const direction = column == sort ? 'ASC' : 'DESC';

        const [items, count] = await this.pgProductRepository.findAndCount({
                order: {
                    [column]: direction,
                },
                skip: (page - 1) * perPage,
                take: perPage
            });

        return {items, count};
    }

    async findOne(id: number): Promise<PgProduct>
    {
        try {
            const pgProduct = await this.pgProductRepository.findOne(id);

            if(pgProduct)
                return pgProduct;
        } catch(err) {
            console.log(err);
        }

        throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    async create(createPgProductDto: CreatePgProductDto): Promise<PgProduct>
    {
        const model = await this.pgProductRepository.create(createPgProductDto);

        await this.pgProductRepository.save(model);

        return model;
    }

    async update(id: number, updatePgProductDto: UpdatePgProductDto): Promise<PgProduct>
    {
        try{
            await this.pgProductRepository.update(id, updatePgProductDto);
        } catch(err) {
            console.log(err.message);
        }

        return this.findOne(id);
    }

    async delete(id: number)
    {
        let response;

        try{
            response = id ? await this.pgProductRepository.delete(id) : {};
        } catch (err) {
            console.log(err);
            throw new HttpException("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR)
        }

        if(!response.affected){
            throw new NotFoundException('Product not found');
        }
    }
}