import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
  //Habilita o express na porta 3333
  const server = app.listen(process.env.PORT || 3333, () => {
    // eslint-disable-next-line no-console
    console.log('Server started on port 3333! http://localhost:3333/');
  });
});
