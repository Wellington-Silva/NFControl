import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { Company } from './Company';
import { Client } from './Client';
import { InvoiceItem } from './InvoiceItem';

export enum InvoiceType {
  NFE = 'NF-e',
  NFSE = 'NFS-e',
}

export enum InvoiceStatus {
  ACTIVE = 'active',
  CANCELLED = 'cancelled',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: InvoiceType })
  type: InvoiceType;

  @Column({ unique: true })
  invoiceCode: string;

  @Column()
  total: number;

  @Column()
  hash: string;

  @Column({ type: 'enum', enum: InvoiceStatus, default: InvoiceStatus.ACTIVE })
  status: InvoiceStatus;

  @CreateDateColumn()
  issuedAt: Date;

  @ManyToOne(() => Company, company => company.invoices)
  company: Company;

  @ManyToOne(() => Client, client => client.invoices)
  client: Client;

  @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true })
  items: InvoiceItem[];
}
