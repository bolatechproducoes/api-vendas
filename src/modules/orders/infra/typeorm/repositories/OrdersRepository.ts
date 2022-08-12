import { Repository } from 'typeorm';
import Order from '../entities/Order';
import { ICreateOrder } from '../../../domain/models/ICreateOrder';
import { IOrdersRepository } from '../../../domain/repositories/IOrdersRepository';
import { dataSource } from '../../../../../shared/infra/typeorm';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Order);
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.ormRepository.findOne({
      where: { id },
      relations: { order_products: true, customer: true },
    });

    return order;
  }

  public async create({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}

export default OrdersRepository;
