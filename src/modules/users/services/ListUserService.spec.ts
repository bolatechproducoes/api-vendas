import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import ListUserService from './ListUserService';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let listUser: ListUserService;
let fakeHashProvider: FakeHashProvider;

describe('listUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    listUser = new ListUserService(fakeUsersRepository);
  });
  it('should be able to list all users', async () => {
    await expect(listUser.execute()).resolves.toBeInstanceOf(Array);
  });
});
