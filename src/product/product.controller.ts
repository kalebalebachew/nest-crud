import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { createProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { Product } from './interfaces/product.interface';
import { LoggingInterceptor } from '../log.interceptor';

@UseInterceptors(LoggingInterceptor)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAllProducts(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Post('create')
  createProduct(@Body() create: createProductDto): Promise<Product> {
    return this.productService.createProduct(create);
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.getOneProduct(id);
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): Promise<Product> {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  updateProduct(
    @Body() update: createProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.updateProduct(id, update);
  }
}
