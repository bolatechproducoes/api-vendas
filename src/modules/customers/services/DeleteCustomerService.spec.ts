import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let deleteCustomer: DeleteCustomerService;

describe('deleteCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    deleteCustomer = new DeleteCustomerService(fakeCustomersRepository);
  });
  it('should be delete a customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    expect(await deleteCustomer.execute(customer)).toBe(undefined);
  });

  it('should not be able delete non exitent customer', async () => {
    const customer = await createCustomer.execute({
      name: 'none',
      email: 'teste@email.com',
    });

    expect(await deleteCustomer.execute(customer)).rejects.toBeInstanceOf(
      'Customer not found.',
    );
  });
});
