import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Redirect,
  HttpCode,
} from '@nestjs/common';
import { createProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  @Get()
  @HttpCode(302)
  @Redirect('https://hudc.org')
  getAllProducts(): string {
    return 'all products returned';
  }

  @Post('create')
  createProduct(@Body() create: createProductDto): string {
    return `name: ${create.name} Description: ${create.description}`;
  }

  @Get(':id')
  getOneProduct(@Param('id') id: string): string {
    return `id: ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string): string {
    return `Deleted Product: ${id}`;
  }

  @Put(':id')
  updateProduct(
    @Body() update: createProductDto,
    @Param('id') id: string,
  ): string {
    return `Updated Product: ${update.name}, ${update.description}`;
  }
}
