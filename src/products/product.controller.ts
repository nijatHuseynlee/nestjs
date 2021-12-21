import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { Product } from "./product.model";
import { ProductService } from "./product.service";

@Controller("products")
export class ProductController
{
    constructor(private readonly productService: ProductService) {}

    @Get()
    index(): Array<Product>
    {
        return this.productService.all();
    }

    @Post()
    addProduct(
        // @Body() payload: {
        //     title: string,
        //     desc: string,
        //     price: number,
        // }
        @Body('title') prodTitle: string,
        @Body('desc') desc: string,
        @Body('price') price: number,
    ): Product
    {
        return this.productService.insertProduct(prodTitle, desc, price);
    }

    @Get(":id")
    show(
        @Param('id') id: number,
    ): Product
    {
        return this.productService.findById(id);
    }
}