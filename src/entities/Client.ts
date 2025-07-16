import {
  Entity, PrimaryGeneratedColumn, Column, OneToMany
} from 'typeorm';
import { Invoice } from './Invoice';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cpfOrCnpj: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @OneToMany(() => Invoice, invoice => invoice.client)
  invoices: Invoice[];
}