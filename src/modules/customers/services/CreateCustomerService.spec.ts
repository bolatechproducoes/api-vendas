import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;

describe('createCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    await expect(
      createCustomer.execute({
        name: 'Gustavo',
        email: 'teste@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
