import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";
import { number } from "joi";

export class PaginationDto{

    @IsPositive()
    @IsOptional()
    @Type(()=>number)
    page?:number =1;

    @IsPositive()
    @IsOptional()
    @Type(()=>number)
    limit?:number=10;

}