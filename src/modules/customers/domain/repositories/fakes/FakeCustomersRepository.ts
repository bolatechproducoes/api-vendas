import { v4 as uuidv4 } from 'uuid';
import { ICreateCustomer } from '../../models/ICreateCustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';
import {
  ICustomersRepository,
  SearchParams,
} from '../../repositories/ICustomersRepository';
import Customer from '../../../infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomersRepository {
  // Atributo que recebe os métodos do TypeORM
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(customer: Customer): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const customer = new Customer();
    const paginate = {
      per_page: 2,
      total: 2,
      current_page: 2,
      data: [customer],
    };

    paginate.per_page = 3;
    return paginate;
  }

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    if (customer === undefined) {
      return null;
    }
    return customer;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    if (customer === undefined) {
      return null;
    }
    if (customer.name === 'none') {
      return null;
    }

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    if (customer === undefined) {
      return null;
    }
    return customer;
  }
}

export default FakeCustomersRepository;
