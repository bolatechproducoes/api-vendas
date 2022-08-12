import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '../../models/ICreateUser';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import User from '../../../infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  // Atributo que recebe os métodos do TypeORM
  private users: User[] = [];

  public async create({ name, email }: ICreateUser): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async remove(user: User): Promise<void> {}

  public async findAll(): Promise<User[]> {
    const user = new User();
    user.id = 'fjkndsk767df';
    user.name = 'fulano';
    user.email = 'teste@email.com';
    user.password = '123456';
    user.avatar = 'djnfjnd';
    user.created_at = new Date();
    user.updated_at = new Date();

    return [user];
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);
    if (user === undefined) {
      return null;
    }
    return user;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    if (user === undefined) {
      return null;
    }
    return user;
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    if (user === undefined) {
      return null;
    }
    return user;
  }
}

export default FakeUsersRepository;
