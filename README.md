# 📄 NFControl – API de Emissão de Notas Fiscais NF-e e NFS-e

API backend desenvolvida em Node.js com suporte para emissão, validação e gerenciamento de **Notas Fiscais Eletrônicas (NF-e)** e **Notas Fiscais de Serviço Eletrônicas (NFS-e)**, ideal para sistemas de vendas de produtos e prestação de serviços.

---

## 🚀 Funcionalidades

- 📦 Emissão de NF-e para produtos (modelo 55)
- 🧾 Emissão de NFS-e para serviços
- 🔍 Validação de notas fiscais via código único
- 📊 Cálculo automático de impostos (ICMS e ISS)
- 📁 Armazenamento de dados com histórico de emissão
- 🔐 Geração de hash de autenticidade
- 🧑‍💼 Autenticação de empresas emissoras (JWT)

---

## 🧠 Tecnologias Utilizadas

- **Node.js** + **TypeScript**
- **Express** – Microframework principal
- **PostgreSQL** – Banco de dados relacional
- **TypeORM** – ORM para modelagem de entidades
- **JWT** – Autenticação segura
- **bcrypt** – Hash de senhas
- **class-validator** – Validação de DTOs
- **crypto** – Geração de hash de verificação

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/Wellington-Silva/NFControl
cd NFControl

# Instale as dependências
npm install

# Configure as variáveis de ambiente
.env.example  
# edite o .env com suas informações

# Execute as migrations (caso use TypeORM CLI)
npm run typeorm migration:run

# Inicie o servidor
npm run start:dev
```

---

| Método | Rota                       | Descrição                     |
| ------ | -------------------------- | ----------------------------- |
| POST   | `/invoices/issue`          | Emitir NF-e NFS-e             |
| GET    | `/invoices/:id  `          | Obter detalhes da nota fiscal |
| GET    | `/invoices/validate/:code` | Validar código da nota fiscal |
| DELETE | `/invoices/:id`            | Cancelar nota fiscal          |
| GET    | `/invoices`                | Listar notas por filtros      |

---

## Estrutura do projeto

```bash
src/
├── controllers/
│   ├── InvoiceController.ts
├── routes/
│   ├── InvoiceRouter.ts
│   ├──  CompanyRouter.ts
|   ├──  ClientRouter.ts
├── services/
|   ├── AuthService.ts
│   ├── InvoiceService.ts
├── entities/
│   ├── Company.ts
│   ├── Client.ts
│   ├── Invoice.ts
│   ├── InvoiceItem.ts
├── database/
│   ├── ormconfig.ts
├── middlewares/
│   ├── authMiddleware.ts
|   ├── asyncHandler.ts
├── utils/
│   ├── generateHash.ts
├── server.ts
```

---

## ✉️ Contato
Desenvolvido por Wellington Silva  
📧 wellingtonsilva112000@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/wellingtoncarvalhosilva)