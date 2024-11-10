import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('product')
export class ProductController {
  @Get()
  findAll(): string {
    return 'all products';
  }
}
