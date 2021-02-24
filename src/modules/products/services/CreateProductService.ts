import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) { } //eslint-disable-line

  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productsExists = await this.productsRepository.findByName(name);

    if (productsExists) {
      throw new AppError('There is already one product with this name');
    }
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });
    return product;
  }
}

export default CreateProductService;
