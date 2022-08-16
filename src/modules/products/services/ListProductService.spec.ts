import 'reflect-metadata';
import ListProductService from './ListProductService';
import CreateProductService from './CreateProductService';
import FakeProductsRepository from '../domain/repositories/fakes/FakeProductsRepository';
import Product from '../infra/typeorm/entities/Product';

let fakeProductsRepository: FakeProductsRepository;
let listProduct: ListProductService;
let createProduct: CreateProductService;

describe('listProducts - Use Redis Cache', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listProduct = new ListProductService(fakeProductsRepository);
    createProduct = new CreateProductService(fakeProductsRepository);
  });
  it('should be able to list products', async () => {
    const product = await createProduct.execute({
      name: 'teste',
      price: 10,
      quantity: 10,
    });
    expect(await listProduct.execute()).toEqual([
      { id: 'teste', name: 'none', price: 10, quantity: 10 } as Product,
      { name: 'produtoteste', price: 10, quantity: 10 } as Product,
    ]);
  });
});
