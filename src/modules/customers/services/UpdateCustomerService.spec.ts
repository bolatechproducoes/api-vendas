import 'reflect-metadata';
import CreateCustomerService from './CreateCustomerService';
import UpdateCustomerService from './UpdateCustomerService';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import AppError from '../../../shared/errors/AppError';

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let updateCustomer: UpdateCustomerService;

describe('updateCustomer', () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
  });
  it('should be update a customer', async () => {
    const customer = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    expect(await updateCustomer.execute(customer)).toHaveProperty('name');
  });

  it('should not be able update non exitent customer', async () => {
    const customer = await createCustomer.execute({
      name: 'none',
      email: 'teste2@email.com',
    });

    await expect(updateCustomer.execute(customer)).rejects.toBeInstanceOf(
      AppError,
    );
  });
  it('should not be able to update customers with email already in use', async () => {
    const user1 = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste@email.com',
    });

    const user2 = await createCustomer.execute({
      name: 'Gustavo',
      email: 'teste2@email.com',
    });

    expect(
      updateCustomer.execute({
        name: 'Gustavo',
        email: 'teste@email.com',
        id: user2.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
