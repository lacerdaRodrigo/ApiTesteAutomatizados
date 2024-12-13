# API de Estudo

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://shields.io/)

Uma API de estudo com front-end e back-end integrados, ideal para testes de automação de front-end e back-end usando várias linguagens. Este projeto utiliza MongoDB como banco de dados para armazenar todos os tipos de dados do sistema.

## Instalação

### Pré-requisitos

- Node.js
- npm
- MongoDB

### Passos para Instalação

1. Clone o repositório:

    ```sh
    https://github.com/lacerdaRodrigo/ApiTesteAutomatizados.git
    ```

2. Instale as dependências:

    ```sh
    npm install
    ```

3. Configure o MongoDB:
   
  Obs: Por se tratar de um projeto pessoal e publico por motivos de segurança e não estourar o banco que e de apenas 500mb.
  Recomendo criar uma conta no mongoDb para configurar o projeto de forma ideal. 
  
4. Criando conta no mondoDb:
```sh
https://cloud.mongodb.com/
```
Entre no link acima crie a sua conta e acesse o link abaixo.

```sh
https://cloud.mongodb.com/v2#/org/6716774fa532422740c7fbff/projects/create
```
* 1 : Preencher os campos solicitados e clicar em create.
* 1.1 : Criar um cluster : clique em create 
* 1.2 : Escolha o plano M0 que e free.
* 1.3 : Clique em create Deployment
* 1.4 : Leia o campo ( Connect ). e salve o username e password
* 1.5 : Clique em ( Create Database User ) Obs: preste a atenção na senha e login 
* 1.6 : Clique em ( Choose a connection method ) 
* 1.7 : Clique em ( Driver ) e copie o link do driver : mongodb+srv://lacerdaarodrigo:********** ..... e clique em done

Pronto, agora você pode conectar no projeto . 

* 2 : Dentro da  pasta configBd faça o seguinte.
* 2.1 : crie um arquivo db.js e cole na uri o seu clink do driver que copiou quando criou o banco. 
Não copiou não se preocupe , pegue novamente clicando em ( connect e depois clieque em  Drivers )
use o exemplo abaixo para colar no seu db.js
```sh
const mongoose = require('mongoose');
const uri = 'mongodb+srv://lacerdaarodrigo:<db_password> *********** ... ';

mongoose.connect(uri)
    .then(() => console.log('Conectado ao MongoDB Atlas'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));

module.exports = mongoose;

```
2.2 : Em uri ( <db_password> sem <> )  coloque a sua senha  que você criou. 



4. Inicie o servidor da API que esta localizado na pasta (Modelo_Estudo_Api_Back-End):

    ```sh
    npm start run 
    ```
    Vai aparecer a seguinte mensagem : *Conectado ao MongoDB Atlas*

## Uso

### Endpoints criar usuario ( User ) 

- **GET** `http://localhost:5000/users` - Lista todos os usuarios
- **POST** `http://localhost:5000/users/register` - Cria um novo usuario
- **GET-ID** `http://localhost:5000/users/xxxx` - Busca um usuario específico por ID
- **DELETE** `http://localhost:5000/users/xxxxx` - Deleta um usuario específico por ID

### Json para Post-User
 ```{
    "name": " ",
    "email": "",
    "password": "",
    "confirmpassword": "",
    "phone": ""
    }
```

### Endpoints login usuario ( login ) 

- **POST** `http://localhost:5000/users/login` - Login no sistema
-  **GET** `http://localhost:5000/users/checkuser` - Login no sistema por token que foi gerado no login para usar vai em Authorization e user Beares Token e cole o token.

### Json para Post-Login
```
{
"name": "",
 "email": "",
 "password": ""
}

```
  

### Exemplos de Uso

Faça as requisições pelo postman


