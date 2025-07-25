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
    issuedAt: Date;  // Data de emissão da nota fiscal

    @Column({ nullable: true })
    cfop?: string; // Código Fiscal de Operações e Prestações (NF-e)

    @Column({ nullable: true })
    ncm?: string; // Código NCM do produto (NF-e)

    @Column({ nullable: true })
    cst?: string; // Código da Situação Tributária (NF-e)

    @Column({ nullable: true })
    natureOfOperation?: string; // Descrição da natureza da operação (ambos)

    @Column({ nullable: true })
    serviceCode?: string; // Código do serviço (NFS-e)

    @Column({ nullable: true })
    municipalCode?: string; // Código do município (NFS-e)

    @ManyToOne(() => Company, company => company.invoices)
    company: Company;

    @ManyToOne(() => Client, client => client.invoices)
    client: Client;

    @OneToMany(() => InvoiceItem, item => item.invoice, { cascade: true, eager: true })
    items: InvoiceItem[];
};