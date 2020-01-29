# sistema-de-vagas

## Sobre o sistema:

A aplicação consiste em um sistema de cadastro de usuários e vagas, onde os usuários **Administradores** criam e gerenciam vagas, enquanto os usuários comuns visualizam e se candidatam à essas vagas.


### Um pouco sobre as ferramentas

Algumas tecnologias utilizadas no projeto: 

- Sucrase + Nodemon;
- ESLint + Prettier + EditorConfig;
- Sequelize (MySQL);
- Express Framework
- JWT Token
- Axios 
- Yup
- DotEnv
- Bcrypt

### Iniciando o projeto

Para iniciar o projeto na sua máquina, basta clonar/baixar este repositório e logo em seguida, entrar na pasta do projeto, abrir o terminal na pasta e rodar "npm install" para instalação de todas as dependências. 

O banco de dados está indo no formato .sql. Crie uma base de dados no seu banco e importe o arquivo .sql disponibilizado. 
Se preferir, na pasta "migrations" tem todos os arquivos utilizados para a criação dos campos no banco. 
Depois de instalado o Sequelize, rode o comando no terminal dentro da pasta do projeto: "yarn sequelize db:migrate". Tenha já configurado as credenciais do seu servidor do banco de dados. Preste atenção também na ordem das migrations, pois existem relacionamentos e tabelas que dependem que outras já existam.

### Funcionalidades

Abaixo estão descritas as funcionalidades na aplicação.

#### 1. Autenticação

O usuário se autentica na aplicação utilizando e-mail e uma senha.

É possível criar usuário administradores utilizando a funcionalidade 'seeds' do Sequelize.

Para criar um seed utilize o comando:

```js
yarn sequelize seed:generate --name admin-user
```

No arquivo gerado na pasta `seeds`, adicione o código referente à criação de um usuário administrador:

```js
const bcrypt = require("bcryptjs");

module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      "users",
      [
        {
          name: "Administrador",
          email: "admin@gmail.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: () => {}
};
```

Agora execute:

```js
yarn sequelize db:seed:all
```

Agora você tem um usuário administrador na sua base de dados, utilize esse usuário para operações que exijam privilégio de administrador.

- A autenticação deve ser feita utilizando JWT.
- Realize a validação dos dados de entrada;

#### 2. Cadastro de Usuários

 Usuário são cadastrados na aplicação utilizando nome, email, cpf, telefone e senha.

A tabela referente no banco de dados chama-se `users`.

#### 3. Funcionalidades do Usuário Comum 

O usuário que não é **Administrador** pode: 

- Visualizar vagas.
- Candidatar-se à uma ou mais vagas.

#### 4. Funcionalidades do Administrador

O usuário **Administrador** cadastrado na aplicação pode: 

- Criar vagas e gerenciá-las(ativar/desativar).
- Gerenciar candidaturas(adicionar comentários).
