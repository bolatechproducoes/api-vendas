# API-Vendas
#### Repositório do código desenvolvido no [Curso de TypeORM com TypeScript e PostgreSQL](https://www.udemy.com/course/api-restful-de-vendas/) do professor [Jorge Aluizio](https://www.udemy.com/user/jorge-aluizio-alves-de-souza/) na [Udemy](https://www.udemy.com/)

### Para baixar/clonar o projeto:
```git clone https://github.com/bolatechproducoes/api-vendas.git .```

* Para rodar a api:
1. Executar o container do [Postgres](https://github.com/bolatechproducoes/api-vendas#postgresql), configurar o bd apivendas e instalar a extensão do uuid no postgres.
2. Executar o comando: ```yarn```
3. Executar as [migrações das tabelas](https://github.com/bolatechproducoes/api-vendas#comandos-cli).
4. Executar o container do [Redis](https://github.com/bolatechproducoes/api-vendas#redis).
5. Alterar os arquivos ```.env.example``` e ```ormconfig.example.json``` para: ```.env``` e ```ormconfig.json``` e configurar as variaveis de ambiente destes arquivos de acordo com as suas configurações.
6. Executar o comando: ```yarn dev```
* Você pode testar a api utilizando o [Swagger](https://swagger.io/) executando o arquivo [openapi.yaml](https://github.com/bolatechproducoes/api-vendas/blob/master/openapi.yaml) com a extensão: [OpenApi(Swagger)](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) do VsCode (ou no próprio Swagger) ou utilizar o Insomnia ou PostMan configurando as rotas e tokens.
* Você pode criar uma build de produção com o babel utilizando o comando ```yarn build```, para testar/utilizar a build você deve alterar os caminhos do arquivo ```ormconfig.json``` trocando ```src/``` por ```dist/``` e o final dos arquivos de ```.ts``` para ```.js```. O comando para executar a build de produção do projeto é ```node dist/shared/http/server.js```. Lembre-se de adicionar sua url de produção no arquivo openapi.yaml para poder testa-la em produção.

## PostgreSQL

* Comando para executar o container postgres a primeira vez:
```docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres```

* Acessar o banco de dados com o usuario postgres e a senha docker e criar o banco de dados apivendas.

* Rodar o comando de migrações do typeorm:
```yarn typeorm migration:run```

* Comando para iniciar o container quando reiniciar o pc:
```docker start postgres```

* Comando para rodar o container PostgreSQL em produção:
```docker run --name postgresql -e POSTGRESQL_USERNAME=your-user-name -e POSTGRESQL_PASSWORD=your-password -e POSTGRESQL_DATABASE=your-database-name -p 5432:5432 -d --restart=unless-stopped bitnami/postgresql:latest```
(é uma boa prática alterar a porta padrão do bd em produção(-p outrovalor:5432))

## REDIS

Server para implementar cache de consultas no bd

* Comando para instalar as dependencias do redis no projeto:
```yarn add redis ioredis```

* Comando para instalar a tipagem dos pacotes:
```yarn add -D @types/redis @types/ioredis```

* Comando para executar o container do redis a primeira vez:
```docker run --name redis -p 6379:6379 -d -t redis:alpine```

* Comando para iniciar o container quando reiniciar o pc:
```docker start redis```

* Comando para executar o container Redis em produção:
```docker run --name redis -e REDIS_PASSWORD=your-password -p 6379:6379 -d --restart=unless-stopped bitnami/redis:latest```
(é uma boa prática alterar a porta padrão do bd em produção(-p outrovalor:6379))

* RedisInsight é um client para acessar os dados salvos no cache do Redis.
(MUDOU BASTANTE E FOI SUBSTITUIDO NO CURSO)

* Comando para executar o container do RedisInsight a primeira vez:
```docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest```
(MUDOU BASTANTE E FOI SUBSTITUIDO NO CURSO)

#### Alternativas ao RedisInsight:

1. **Another Redis Desktop Manager:**
https://github.com/qishibo/AnotherRedisDesktopManager
* Configuração para acessar o container em localhost:
![configuração de acesso another redis](https://github.com/bolatechproducoes/api-vendas/blob/master/diagramas/another-redis-config-connection.png)

* Comando para instalar no Ubuntu:
```sudo snap install another-redis-desktop-manager```

2. **Utilizar o terminal para acessar o container:**
* Comando para acessar o terminal do container redis:
```docker exec -it redis sh```

* Comando para acessar a CLI do Redis:
```redis-cli```

* Comando para criar uma chave com valor:
```set NOMEDACHAVE NOMEDOVALOR```

* Comando para acessar um registro:
```get NOMEDACHAVE```

* Comando para deletar uma chave:
```del NOMEDACHAVE```

* Comando para deletar varias chaves:
```del [NOMEDEUMACHAVE NOMEDEOUTRACHAVE]```


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
```yarn typeorm migration:create -n NOMEDAMIGRAÇÂO```

* Comando para executar migração no TypeORM:
```yarn typeorm migration:run```

* Comando para desfazer uma migração:
```yarn typeorm migration:revert```

* Comando para mostrar as migrações:
```yarn typeorm migration:show```

* Comando para rodar as migrações no servidor de produção:
```./node_modules/.bin/typeorm migration:run```

## Diagrama do fluxo no TypeORM:

![diagrama fluxo typeorm](https://github.com/bolatechproducoes/api-vendas/blob/master/diagramas/Sequencia%20de%20criacao%20TypeORM%20em%20TS.png)
