import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import ShowCustomerService from './ShowCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let showCustomer: ShowCustomerService;

describe('showCustomers', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });
  it('should be able to list customer data finding by id', async () => {
    const customer = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    expect(await showCustomer.execute({ id: customer.id })).toHaveProperty(
      'name',
    );
  });
  it('should not be able show a non exitent customer', async () => {
    const customer = await createCustomer.execute({
      name: 'none',
      email: 'teste2@email.com',
    });

    await expect(showCustomer.execute(customer)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
