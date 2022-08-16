import 'reflect-metadata';
import CreateProductService from './CreateProductService';
import UpdateProductService from './UpdateProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import AppError from '../../../shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let updateProduct: UpdateProductService;

describe('updateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    updateProduct = new UpdateProductService(fakeProductsRepository);
  });
  it('should be update a product', async () => {
    const product = await createProduct.execute({
      name: 'maisum',
      price: 10,
      quantity: 10,
    });

    expect(await updateProduct.execute(product)).toHaveProperty('name');
  });

  it('should not be able update non exitent product', async () => {
    const product = await createProduct.execute({
      name: 'maisum',
      price: 10,
      quantity: 10,
    });

    product.id = 'nada';

    await expect(updateProduct.execute(product)).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should not be able to update product with same name', async () => {
    const product1 = await createProduct.execute({
      name: 'qualquer',
      price: 10,
      quantity: 10,
    });

    const product2 = await createProduct.execute({
      name: 'qualquercoisa',
      price: 10,
      quantity: 10,
    });

    product2.id = '123457';

    await expect(
      updateProduct.execute({
        id: 'toFind',
        name: 'none',
        price: 10,
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
