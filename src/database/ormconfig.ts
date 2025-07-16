import { DataSource } from 'typeorm';
import { Company } from '../entities/Company';
import { Client } from '../entities/Client';
import { Invoice } from '../entities/Invoice';
import { InvoiceItem } from '../entities/InvoiceItem';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Company, Client, Invoice, InvoiceItem],
});
