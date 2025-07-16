import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';
import { Invoice } from './Invoice';

export type TaxType = 'ICMS' | 'ISS';

@Entity('invoice_items')
export class InvoiceItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'enum', enum: ['ICMS', 'ISS'] })
  taxType: TaxType;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  taxRate: number;

  @ManyToOne(() => Invoice, (invoice: Invoice) => invoice.items)
  invoice: Invoice;
}
