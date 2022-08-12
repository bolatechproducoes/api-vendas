# API-Vendas
#### Repositório do código desenvolvido no [Curso de TypeORM com TypeScript e PostgreSQL](https://www.udemy.com/course/api-restful-de-vendas/) do professor [Jorge Aluizio](https://www.udemy.com/user/jorge-aluizio-alves-de-souza/) na [Udemy](https://www.udemy.com/)

### Para baixar/clonar o projeto:
```git clone https://github.com/bolatechproducoes/api-vendas.git .```

* Para rodar o projeto pelo docker-compose:

1. Depois de clonar o projeto, executar no terminal na pasta do projeto o comando: ```chmod +x .docker/entrypoint.sh```
2. Renomear o arquivo ```.env.example.docker-compose``` para ```.env```
3. Rodar no  terminal na pasta do projeto o comando: ```docker-compose up``` para subir os containers e executar a aplicação.
4. A api estará rodando em ```http://localhost:3333``` e as alterações que você fizer no código serão aplicadas no container, a pasta do projeto é o volume do node, para acessar o terminal do container do node utilize o comando: ```docker-compose exec app bash```, trabalhe com o docker-compose rodando e as instalações e alterações de pacotes faça dentro do shell do node.
5. O PGadmin estará rodando em ```http://localhost:8000```, com ele você pode acessar o banco de dados do Postgres, utilize o email 'admin@admin.com' e a senha 'admin' para acessa-lo, clique no icone 'Add New Server', na aba 'General' preencha o campo 'name' com o nome 'Postgres', na aba 'Connection' preencha o 'Hostname/Adress' com o nome 'bd', preencha o campo 'Username' com o valor 'postgres' e preencha o campo 'Password' com o valor 'docker', marque a opção 'Save password' e clique no botão 'Save', agora você pode acessar os dados do banco de dados da api por aqui, o volume dos dados do banco de dados estará salvo no caminho: ```.docker/dbdata``` na pasta do seu projeto, ou seja, você pode destruir os containers do Docker que os dados continuarão salvos, você também pode acessar o shell do banco de dados executando o comando ```docker-compose exec db bash```.
6. O openapi SWAGGER estará rodando em ```http://localhost:8001```, aqui estará a documentação da api e você pode testar as rotas aqui, comece cadastrando um usuário para pode iniciar uma sessão e gerar o token de autenticação das outras rotas, lembre se de copiar o token e colar no botão de Authorization para liberar as rotas, o token é válido por 1 dia, o arquivo [openapi.yaml](https://github.com/bolatechproducoes/api-vendas/blob/master/.docker/doc/openapi.yaml) esta no caminho: ```.docker/doc/openapi.yaml``` na pasta do projeto.
7. Para acessar o cache salvo pelo [Redis](https://github.com/bolatechproducoes/api-vendas#redis) você pode utilizar [estas duas opções](https://github.com/bolatechproducoes/api-vendas#alternativas-ao-redisinsight), você pode utilizar o comando: ```docker-compose exec redis bash``` para acessar o shell do container do Redis.
8. Você pode rodar os testes do Jest executando na pasta do projeto o comando: ```docker-compose exec app yarn test```, depois você pode acessar o relatório de cobertura dos testes abrindo o arquivo ```/coverage/lcov-report/index.html``` no seu navegador.

* Para rodar a api no seu sistema sem utilizar o docker-compose:

1. Executar o container do [Postgres](https://github.com/bolatechproducoes/api-vendas#postgresql), configurar o bd apivendas e instalar a extensão do uuid no postgres.
2. Executar o comando: ```yarn```
3. Executar as [migrações das tabelas](https://github.com/bolatechproducoes/api-vendas#comandos-cli).
4. Executar o container do [Redis](https://github.com/bolatechproducoes/api-vendas#redis).
5. Alterar o arquivo ```.env.example``` para: ```.env```.
6. Executar o comando: ```yarn dev```
7. A api estará rodando em ```http://localhost:3333```

## Como testar a api

* Você pode testar a api utilizando o [Swagger](https://swagger.io/) executando o arquivo [openapi.yaml](https://github.com/bolatechproducoes/api-vendas/blob/master/.docker/doc/openapi.yaml) com a extensão: [OpenApi(Swagger)](https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi) do VsCode (ou no próprio Swagger) ou utilizar o Insomnia ou PostMan configurando as rotas e tokens. (Lembre-se de adicionar sua url de produção no arquivo openapi.yaml para poder testa-la em produção)
* Você pode criar uma build de produção com o babel utilizando o comando ```yarn build```. O comando para executar a build de produção do projeto é ```node dist/shared/infra/http/server.js```.

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

* Comando para criar uma migração com o TypeORM no TypeORM 2.x:
```yarn typeorm migration:create -n NOMEDAMIGRAÇÂO```

* Comando para criar uma migração com o TypeORM no TypeORM 3.x:
```yarn typeorm migration:create ENDERECODAMIGRACAO NOMEDATABELA```

* Comando para executar migração no TypeORM no TypeORM 2.x:
```yarn typeorm migration:run```

* Comando para executar migração no TypeORM no TypeORM 3.x:
```yarn -- -d ENDERECODOARQUIVODECONFIGDASMIGRACOES typeorm migration:run```

* Comando para desfazer uma migração:
```yarn typeorm migration:revert```

* Comando para mostrar as migrações:
```yarn typeorm migration:show```

* Comando para rodar as migrações no servidor de produção:
```./node_modules/.bin/typeorm migration:run```

## Mudanças na versão 3.x do TypeORM

* Não utiliza mais o arquivo ormconfig.json - configurar direto no arquivo de entrada
* É necessário importar todas as entidades e migrações
* Alterar o arquivo server.ts
* Nas migrações é necessário incluir o parametro --dataSource CAMINHODOARQUIVO (flag -d)
* Exemplo: ```yarn -- -d src/shared/infra/typeorm/index.ts typeorm migration:run```
* Para criar uma nova migração o comando é: ```yarn typeorm migration:create ENDERECODAMIGRACAO NOMEDATABELA```
exemplo: ```yarn typeorm migration:create src/shared/infra/typeorm/migrations/CreateMyNewTable```
* A forma de escrever o arquivo de migração continua a mesma
* Os repositórios também precisam ser refatorados

## Diagrama do fluxo no TypeORM:

![diagrama fluxo typeorm](https://github.com/bolatechproducoes/api-vendas/blob/master/diagramas/Sequencia%20de%20criacao%20TypeORM%20em%20TS.png)
