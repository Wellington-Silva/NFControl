import { AppDataSource } from "../database/ormconfig";
import { Client } from "../entities/Client";
import { Company } from "../entities/Company";
import { Invoice } from "../entities/Invoice";
import { InvoiceStatus } from '../entities/Invoice';
import { InvoiceItem } from "../entities/InvoiceItem";
import { InvoiceType } from '../entities/Invoice';

class InvoiceRepository {

    constructor(
        private invoiceRepo = AppDataSource.getRepository(Invoice),
        private companyRepo = AppDataSource.getRepository(Company),
        private clientRepo = AppDataSource.getRepository(Client),
        private itemRepo = AppDataSource.getRepository(InvoiceItem)
    ) { };

    async createInvoice(invoiceData: any) {
        const company = await this.companyRepo.findOne({ where: { id: invoiceData.companyId } });
        const client = await this.clientRepo.findOne({ where: { id: invoiceData.clientId } });

        if (!company || !client) {
            throw new Error("Empresa ou cliente não encontrados.");
        }

        let invoice;

        if (invoiceData.type === InvoiceType.NFE) {
            invoice = this.invoiceRepo.create({
                type: InvoiceType.NFE,
                invoiceCode: invoiceData.invoiceCode,
                total: invoiceData.total,
                hash: invoiceData.hash,
                status: InvoiceStatus.ACTIVE,
                cfop: invoiceData.cfop,
                ncm: invoiceData.ncm,
                cst: invoiceData.cst,
                natureOfOperation: invoiceData.natureOfOperation,
                company,
                client,
                issuedAt: new Date(),
            });

        } else if (invoiceData.type === InvoiceType.NFSE) {
            invoice = this.invoiceRepo.create({
                type: InvoiceType.NFSE,
                invoiceCode: invoiceData.invoiceCode,
                total: invoiceData.total,
                hash: invoiceData.hash,
                status: InvoiceStatus.ACTIVE,
                serviceCode: invoiceData.serviceCode,
                municipalCode: invoiceData.municipalCode,
                natureOfOperation: invoiceData.natureOfOperation,
                company,
                client,
                issuedAt: new Date(),
            });
        } else {
            throw new Error("Tipo de nota fiscal inválido. Use 'NF-e' ou 'NFS-e'.");
        }

        // Primeiro salva a nota fiscal
        const savedInvoice = await this.invoiceRepo.save(invoice);

        // Cria e salva os itens separadamente
        const items = invoiceData.items.map((item: any) =>
            this.itemRepo.create({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.total,
                taxType: item.taxType,
                taxRate: item.taxRate,
                invoice: savedInvoice,
            })
        );

        await this.itemRepo.save(items);

        // Associa os itens ao objeto retornado
        savedInvoice.items = items;

        return savedInvoice;
    };

    async consultationInvoice(invoiceId: string) {
        if (!invoiceId) throw new Error("Invoice ID is required");
        return await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    };

    async validationInvoice(invoiceId: string) {

    };

};

export default new InvoiceRepository();