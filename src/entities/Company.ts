import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Invoice } from './Invoice';

@Entity('companies')
export class Company {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    cnpj: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

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

    @Column()
    cep: string;

    @Column()
    municipalCode: string; // código do município (IBGE)

    @Column()
    ie: string; // inscrição estadual

    @Column()
    im: string; // inscrição municipal

    @Column()
    cnae: string; // CNAE principal

    @Column()
    taxRegime: string; // simples nacional, lucro presumido, etc.

    @Column({ default: true })
    active: boolean;

    @Column({ default: 'homologation' }) // ou 'production'
    environment: string;

    @OneToMany(() => Invoice, invoice => invoice.company)
    invoices: Invoice[];

};