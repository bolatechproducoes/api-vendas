import { DataSource } from 'typeorm';

import User from '../../../modules/users/infra/typeorm/entities/User';
import UserToken from '../../../modules/users/infra/typeorm/entities/UserToken';
import Customer from '../../../modules/customers/infra/typeorm/entities/Customer';
import Order from '../../../modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '../../../modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '../../../modules/products/infra/typeorm/entities/Product';

import { CreateProducts1657632565103 } from './migrations/1657632565103-CreateProducts';
import { CreateUsers1657890156478 } from './migrations/1657890156478-CreateUsers';
import { CreateUserTokens1658075556935 } from './migrations/1658075556935-CreateUserTokens';
import { CreateCustomers1658155794670 } from './migrations/1658155794670-CreateCustomers';
import { CreateOrders1658271747558 } from './migrations/1658271747558-CreateOrders';
import { AddCustomerIdToOrders1658272162074 } from './migrations/1658272162074-AddCustomerIdToOrders';
import { CreateOrdersProducts1658310887604 } from './migrations/1658310887604-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1658311318640 } from './migrations/1658311318640-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1658311805454 } from './migrations/1658311805454-AddProductIdToOrdersProducts';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1657632565103,
    CreateUsers1657890156478,
    CreateUserTokens1658075556935,
    CreateCustomers1658155794670,
    CreateOrders1658271747558,
    AddCustomerIdToOrders1658272162074,
    CreateOrdersProducts1658310887604,
    AddOrderIdToOrdersProducts1658311318640,
    AddProductIdToOrdersProducts1658311805454,
  ],
});
