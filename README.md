# API-Vendas
#### Repositório do código do curso de TypeORM com TypeScript e PostgrSQL do professor Jorge Aluizio na Udemy

### Para baixar/clonar o projeto:
git clone https://github.com/bolatechproducoes/api-vendas.git .

* Para rodar a api:
1. Executar o container do Postgres, configurar o bd apivendas e instalar a extensão do uuid.
2. Executar o comando: yarn
3. Executar as migrações das tabelas.
4. Executar o container do Redis.
5. Executar o comando: yarn dev
* Você pode testar a api utilizando o Swagger executando o arquivo openapi.yaml com a extensão: "OpenApi(Swagger)" do VsCode (ou no próprio Swagger) ou configurar e utilizar o Insomnia ou PostMan.

## PostgreSQL

* Comando para executar o container postgres a primeira vez:
docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

* Acessar o banco de dados com o usuario postgres e a senha docker e criar o banco de dados apivendas.

* Rodar o comando de migrações do typeorm:
yarn typeorm migration:run

* Comando para iniciar o container quando reiniciar o pc:
docker start postgres

## REDIS

Server para implementar cache de consultas no bd

* Comando para instalar as dependencias do redis no projeto:
yarn add redis ioredis

* Comando para instalar a tipagem dos pacotes:
yarn add -D @types/redis @types/ioredis

* Comando para executar o container do redis a primeira vez:
docker run --name redis -p 6379:6379 -d -t redis:alpine

* Comando para iniciar o container quando reiniciar o pc:
docker start redis

* RedisInsight é um client para acessar os dados salvos no cache do Redis.
(MUDOU BASTANTE E FOI SUBSTITUIDO NO CURSO)

* Comando para executar o container do RedisInsight a primeira vez:
docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
(MUDOU BASTANTE E FOI SUBSTITUIDO NO CURSO)

#### Alternativas ao RedisInsight:

1. **Another Redis Desktop Manager:**
https://github.com/qishibo/AnotherRedisDesktopManager
* Configuração para acessar o container em localhost:
![configuração de acesso another redis](https://github.com/bolatechproducoes/api-vendas/blob/master/diagramas/another-redis-config-connection.png)

* Comando para instalar no Ubuntu:
sudo snap install another-redis-desktop-manager

2. **Utilizar o terminal para acessar o container:**
* Comando para acessar o terminal do container redis:
docker exec -it redis sh

* Comando para acessar a CLI do Redis:
redis-cli

* Comando para criar uma chave com valor:
set NOMEDACHAVE NOMEDOVALOR

* Comando para acessar um registro:
get NOMEDACHAVE

* Comando para deletar uma chave:
del NOMEDACHAVE

* Comando para deletar varias chaves:
del [NOMEDEUMACHAVE NOMEDEOUTRACHAVE]


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
