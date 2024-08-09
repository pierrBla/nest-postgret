import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/dto';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  private readonly logger=new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log(`BASE CONECTADO`)
  }
  create(createProductDto: CreateProductDto) {
   return this.user.create({
    data:createProductDto
   })
  }
//para la paginacion
  findAll() {
    //const{page,limit}=paginationDto;
    
    return this.user.findMany({
       where:{available:true}
    //skip:(page -1) * limit,
    //take:limit
    })
  }

  async findOne(id: number) {
   
    const product= await this.user.findFirst({
      where :{id,available:true}
    });
    if(!product){
    throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

 async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id);
    return this.user.update({
      where:{id},
      data:updateProductDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    //para eliminar
  //  return this.product.delete({
    //  where:{id},
    //});

 const product =await this.user.update({
  where:{id},
  data:{
    available:false
  }
 });
 return product;
  }
}
