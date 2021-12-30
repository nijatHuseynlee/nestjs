import { HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateMongoProductDto } from "./dto/createMongoProduct.dto";
import { FindAllMongoProductDto } from "./dto/findAllMongoProduct.dto";
import { UpdateMongoProductDto } from "./dto/updateMongoProduct.dto";
import { MongoProduct } from "./interfaces/mongoProduct.interface";

@Injectable()
export class MongoProductService{
    constructor(@InjectModel('MongoProduct') private readonly mongoProduct: Model<MongoProduct>) {}

    async findAll({ perPage, page, sort}: FindAllMongoProductDto): Promise<MongoProduct[]>
    {
        try{
            const column = sort.replace(/^-/, '');
            const direction = column == sort ? 1 : -1;
            const models = await this.mongoProduct
                .find()
                .skip((page - 1) * perPage)
                .sort({[column]: direction})
                .limit(perPage);

            return models;
        } catch (e) {
            throw e;
        }
        
    }

    async findOne(id: string): Promise<MongoProduct>
    {
        try {
            const model = await this.mongoProduct.findById(id);

            if(model)
                return model;
        } catch(e) {
            console.log(e.message);
        }

        throw new NotFoundException('Product not found');
    }

    async create(
        createMongoProductDto: CreateMongoProductDto
    ): Promise<MongoProduct>
    {
        const model = new this.mongoProduct(createMongoProductDto);

        try{
            return await model.save();
        }
        catch(err)
        {
            throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async update(
        id: string, 
        updateMondoProduct: UpdateMongoProductDto
    ): Promise<MongoProduct>
    {
        try{
            const model = await this.mongoProduct.findOneAndUpdate({_id: id}, updateMondoProduct, {new: true})

            if(model)
                return model;
        } catch(e) {
            console.log(e.message);
        }
        throw new NotFoundException('Product not found');
    }

    async delete(
        id: string,
    ): Promise<void>
    {
        let result = await this.mongoProduct.deleteOne({_id: id}).exec();
        
        if(!result.deletedCount)
            throw new NotFoundException('Product not found');
    }


}