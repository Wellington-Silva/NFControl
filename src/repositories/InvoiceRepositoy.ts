import { AppDataSource } from "../database/ormconfig";
import { Client } from "../entities/Client";
import { Company } from "../entities/Company";
import { Invoice } from "../entities/Invoice";
import { InvoiceStatus } from '../entities/Invoice';
import { InvoiceItem } from "../entities/InvoiceItem";

class InvoiceRepository {

    constructor(
        private invoiceRepo = AppDataSource.getRepository(Invoice),
        private companyRepo = AppDataSource.getRepository(Company),
        private clientRepo = AppDataSource.getRepository(Client),
        private itemRepo = AppDataSource.getRepository(InvoiceItem)
    ) {};

    async createInvoice(invoiceData: any) {
        const company = await this.companyRepo.findOne({ where: { id: invoiceData.companyId } });
        const client = await this.clientRepo.findOne({ where: { id: invoiceData.clientId } });

        if (!company || !client) {
            throw new Error("Empresa ou cliente não encontrados.");
        }

        const invoice = this.invoiceRepo.create({
            type: invoiceData.type,
            invoiceCode: invoiceData.invoiceCode,
            total: invoiceData.total,
            hash: invoiceData.hash,
            status: InvoiceStatus.ACTIVE,
            cfop: invoiceData.cfop,
            ncm: invoiceData.ncm,
            cst: invoiceData.cst,
            natureOfOperation: invoiceData.natureOfOperation,
            serviceCode: invoiceData.serviceCode,
            municipalCode: invoiceData.municipalCode,
            company,
            client,
            issuedAt: new Date(),
        });

        invoice.items = invoiceData.items.map((item: any) =>
            this.itemRepo.create({
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                invoice,
            })
        );

        await this.invoiceRepo.save(invoice);
        return invoice;
    };

    async consultationInvoice(invoiceId: string) {
        if (!invoiceId) throw new Error("Invoice ID is required");
        return await this.invoiceRepo.findOne({ where: { id: invoiceId } });
    };

    async validationInvoice(invoiceId: string) {

    };

};

export default new InvoiceRepository();