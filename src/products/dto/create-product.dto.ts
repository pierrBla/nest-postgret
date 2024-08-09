import { Type } from "class-transformer";
import { IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {

    @IsString()
    
    public nombre:string;

    @IsNumber()
    @Min(0)
    @Type(()=>Number)
    public precio:number;

}
