import { IProductsRepository } from '../../../domain/repositories/IProductsRepository';
import Product from '../../../infra/typeorm/entities/Product';
import { IFindProducts } from '../../../domain/models/IFindProducts';
import { ICreateProduct } from '../../../domain/models/ICreateProduct';
import { IUpdateStockProduct } from '../../../domain/models/IUpdateStockProduct';

class ProductsRepository implements IProductsRepository {
  private products: Product[];

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const product = new Product();

    product.name = 'produtoteste';
    product.price = 10;
    product.quantity = 10;

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(
      findProduct => findProduct.id === product.id,
    );

    this.products[findIndex] = product;

    return product;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(product: Product): Promise<void> {}

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    const product = new Product();

    product.id = products[0].id;
    product.name = 'produtoteste';
    product.price = 10;
    product.quantity = products[0].quantity;

    this.products.push(product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = this.products.find(product => product.name === name);
    if (product === undefined) {
      return null;
    }
    if (product.name === 'none') {
      return null;
    }
    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.products.find(product => product.id === id);
    if (product === undefined) {
      return null;
    }
    if (product.name === 'none') {
      return null;
    }

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const product1 = new Product();

    product1.name = 'produtoteste';
    product1.price = 10;
    product1.quantity = 10;

    const productsList = this.products.push(product1);

    return this.products;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const product1 = new Product();

    product1.name = 'produtoteste';
    product1.price = 10;
    product1.quantity = 10;

    const productsList = this.products.push(product1);

    return this.products;
  }
}

export default ProductsRepository;
