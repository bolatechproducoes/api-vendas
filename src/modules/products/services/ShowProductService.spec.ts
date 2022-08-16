import 'reflect-metadata';
import CreateProductService from './CreateProductService';
import ShowProductService from './ShowProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import AppError from '../../../shared/errors/AppError';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;
let showProduct: ShowProductService;

describe('showProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    createProduct = new CreateProductService(fakeProductsRepository);
    showProduct = new ShowProductService(fakeProductsRepository);
  });
  it('should be able to list product data finding by id', async () => {
    const product = await createProduct.execute({
      name: 'Gustavo',
      price: 10,
      quantity: 10,
    });

    expect(await showProduct.execute({ id: product.id })).toHaveProperty(
      'name',
    );
  });
  it('should not be able show a non exitent product', async () => {
    const product = await createProduct.execute({
      name: 'nenhum',
      price: 10,
      quantity: 10,
    });

    product.id = 'nada';

    await expect(showProduct.execute(product)).rejects.toBeInstanceOf(AppError);
  });
});
