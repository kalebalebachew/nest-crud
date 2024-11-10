import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async getAllProducts(): Promise<Product[]> {
    return await this.productModel.find();
  }
  async getOneProduct(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id });
  }
  async createProduct(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }
  async deleteProduct(id: string): Promise<Product> {
    return await this.productModel.findByIdAndDelete(id);
  }
  async updateProduct(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }
}
