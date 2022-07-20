# API-Vendas
#### Repositório do código do curso de TypeORM com TypeScript e PostgrSQL do professor Jorge Aluizio na Udemy

### Para baixar/clonar o projeto:
git clone https://github.com/bolatechproducoes/api-vendas.git .

## PostgreSQL

* Comando para executar o container postgres a primeira vez:
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

* Acessar o banco de dados com o usuario postgres e a senha docker e criar o banco de dados apivendas.

* Rodar o comando de migrações do typeorm:
yarn typeorm migration:run

*Comando para iniciar o container quando reiniciar o pc:
docker start postgres

## TypeORM

https://typeorm.io/

* As definições dos campos das tabelas no TypeORM é feita através de entities.
* As entities são utilizadas através de repositórios: import {getRepository} from typeorm'
* O repositório permite utilizar os métodos como: findOne(), save(), update, etc...
* Pode se criar um custom repository e criar métodos próprios.
* Por padrão todos os campos são requeridos, colocar (isNullable: true,) nas configs para não ser.

* Para poder utilizar o 'uuid_generate_v4()' no bd é necessário abrir o postegres no dbeaver, clicar com o botão da direita do mouse no bd que ira usar, escolher a opção criar-extensão e habilitar o uuid-ossp

## Comandos CLI

* Comando para criar uma migração com o TypeORM:
yarn typeorm migration:create -n NOMEDAMIGRAÇÂO

* Comando para executar migração no TypeORM:
yarn typeorm migration:run

* Comando para desfazer uma migração:
yarn typeorm migration:revert

* Comando para mostrar as migrações:
yarn typeorm migration:show

## Diagrama do fluxo no TypeORM:

![diagrama fluxo typeorm](https://github.com/bolatechproducoes/api-vendas/blob/master/diagramas/Sequencia%20de%20criacao%20TypeORM%20em%20TS.png)
