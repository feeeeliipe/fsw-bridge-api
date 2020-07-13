# FSW-BRIDGE-API

## Objetivo

Tem como objetivo possibilitar a execução de comandos SQL no banco de dados dos produtos Senior e a execução dos serviços SOAP (nativos e customizados) através de uma API REST para construção de aplicações Web.

## Tecnologias e bibliotecas utilizadas

 - [NodeJS] (https://nodejs.org)
 - [Express] (https://expressjs.com)
 - [Knex] (https://knexjs.org)
 - [NodeSoap] (https://github.com/vpulim/node-soap) 
 - [Axios] (https://github.com/axios/axios)

## Funcionalidades

### Autenticação com token Senior X
Método: POST

Endpoint: /auth/authenticateWithToken

Parâmetros da Requisição:
 - Headers:
 - - Authorization: Informar o token da Plataforma Senior X para autenticação

A aplicação fará a autenticação na Plataforma Senior X através do token informado, caso o token informado seja do mesmo tenant configurado na aplicação, será retornado um token JWT para acesso aos recursos da aplicação.

### Autenticação com usuários G5
 - POST (/auth/authenticateWithUser)

### Consulta de tabelas com filtro 
 - POST (/database/{tablename})

### Execução de comandos nativos no banco de dados
 - POST (/database/nativeSQL)

### Execução de serviços SOAP (Senior G5)
 - POST (/soap/execute)

## Configurando a conexão com o banco de dados

### Requisitos
Para execução da API é necessário que o servidor tenha o Instant Client do Oracle instalado na versão correta do banco e compativel com a arquitetura do sistema operacional (x32 ou x64). 

O caminho do Instant Client deve estar definido nas seguintes variáveis de ambiente:
1. PATH
2. OCI_LIB64 ou OCI_LIB32 (Dependendo da arquitetura do sistema operacional)

### Configurando informações do banco de dados

No arquivo config.ts devem ser definidas as informações para conexão com o banco de dados, onde: 
1. host - Nome ou IP do servidor do banco de dados
2. user - Usuário do banco de dados para conexão
3. password - Senha de conexão
4. database - Nome da base de dados do Oracle

## Executando a aplicação

Na pasta raiz do projeto execute os seguintes comandos: 

1. npm install
2. npm run dev

## Instalando a aplicação como um serviço no Windows

Para instalar a aplicação como um serviço no Windows, execute os seguintes comandos: 

1. npm install
2. npm build 
3. node install_service.js

Após a execução do último comandos, algumas janelas de confirmação serão exibidas para instação do serviço. 

O serviço será criado com o nome: fsw-bridge-api

## Desinstalando o serviço do Windows

Para desisntalar a aplicação, execute o comando: 

1. node uninstall_service.js

