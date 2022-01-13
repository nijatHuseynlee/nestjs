import { Type } from "class-transformer";
import { Min, IsOptional, IsInt } from "class-validator";

export class FindAllPgProductDto
{
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    readonly perPage: number = 20;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    readonly page: number = 1;

    @IsOptional()
    @Type(() => String)
    readonly sort: string = 'id';
}