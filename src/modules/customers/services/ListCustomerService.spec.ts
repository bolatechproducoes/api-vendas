import 'reflect-metadata';
import ListCustomerService from './ListCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';

let fakeCustomersRepository: FakeCustomersRepository;
let listCustomer: ListCustomerService;

describe('listCustomers', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    listCustomer = new ListCustomerService(fakeCustomersRepository);
  });
  it('should be able to list customers', async () => {
    const page = 2;
    const limit = 2;

    expect(await listCustomer.execute({ page, limit })).toHaveProperty('data');
  });
});
