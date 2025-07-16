import { 
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    OneToMany 
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
    address: string;

    @Column()
    city: string;

    @Column()
    state: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Invoice, invoice => invoice.company)
    invoices: Invoice[];
}
