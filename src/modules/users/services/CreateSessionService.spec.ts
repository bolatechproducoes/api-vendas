import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'teste@email.com',
      password: '123456',
    });

    user.password = '123456';

    const response = await createSession.execute({
      email: 'teste@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'teste@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'teste@email.com',
      password: '123456',
    });

    user.password = '123456';

    expect(
      createSession.execute({
        email: 'teste@email.com',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
