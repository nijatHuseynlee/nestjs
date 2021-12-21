import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService
{
    products: Product[] = [];

    public all(): Array<Product>
    {
        return this.products;
    }

    public insertProduct(
        title: string,
        desc: string,
        price: number,
    ): Product
    {
        const prodId = new Date().toString();
        const product = new Product(
            prodId,
            title,
            desc,
            price
        );
        this.products.push(product);

        return product;
    }

    public findById(id: number): Product
    {
        if(!this.products[id])
            throw new NotFoundException("Not Foundddd");
        return this.products[id];
    }
}