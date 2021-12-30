import { Type } from "class-transformer";
import { IsNotEmpty, IsString, MaxLength, IsNumber, Min, IsOptional } from "class-validator";

export class UpdateMongoProductDto
{
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @Type(() => String)
    title?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    @Type(() => String)
    desc?: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0.01)
    @Type(() => Number)
    price: number;
}