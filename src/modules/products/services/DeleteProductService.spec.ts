import 'reflect-metadata';
import CreateProductService from './CreateProductService';
import DeleteProductService from './DeleteProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import AppError from '../../../shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let deleteProduct: DeleteProductService;

describe('deleteProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    deleteProduct = new DeleteProductService(fakeProductsRepository);
  });
  it('should be delete a product', async () => {
    const product = await createProduct.execute({
      name: 'Gustavo',
      price: 10,
      quantity: 10,
    });

    expect(await deleteProduct.execute(product)).toBe(undefined);
  });

  it('should not be able delete non exitent product', async () => {
    const product = await createProduct.execute({
      name: 'none2',
      price: 10,
      quantity: 10,
    });

    product.name = 'none';

    await expect(deleteProduct.execute(product)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
