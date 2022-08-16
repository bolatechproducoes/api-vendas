import 'reflect-metadata';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import AppError from '../../../shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('createProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a new product', async () => {
    const product = await createProduct.execute({
      name: 'teste',
      price: 10,
      quantity: 10,
    });

    expect(product).toHaveProperty('name');
  });

  it('should not be able to create a new product with the same name a existent product', async () => {
    await expect(
      createProduct.execute({ name: 'none', price: 10, quantity: 10 }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
