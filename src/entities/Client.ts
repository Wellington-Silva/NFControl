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
  type: 'individual' | 'company';

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  number: string;

  @Column({ nullable: true })
  complement: string;

  @Column()
  neighborhood: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ nullable: true })
  municipalCode: string;

  @Column({ nullable: true })
  ie: string;

  @Column({ nullable: true })
  im: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Invoice, invoice => invoice.client)
  invoices: Invoice[];

};