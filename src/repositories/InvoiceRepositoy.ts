import { Client } from "../entities/Client";
import { Company } from "../entities/Company";
import { Invoice } from "../entities/Invoice";
import { InvoiceType } from '../entities/Invoice';
import { InvoiceStatus } from '../entities/Invoice';
import { InvoiceItem } from "../entities/InvoiceItem";
import { AppDataSource } from "../database/ormconfig";
import { generateHash } from "../utils/generateHash";

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
        const hash = generateHash();

        if (invoiceData.type === InvoiceType.NFE) {
            invoice = this.invoiceRepo.create({
                type: InvoiceType.NFE,
                invoiceCode: invoiceData.invoiceCode,
                total: invoiceData.total,
                hash: hash,
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
                hash: hash,
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

    async consultationInvoice(code: string) {
        if (!code) throw new Error("Invoice Code is required");
        return await this.invoiceRepo.findOne({ where: { invoiceCode: code } });
    };

    async validationInvoice(code: string) {

    };

    async calcTax(code: string) {
        const invoice = await this.invoiceRepo.findOne({ where: { invoiceCode: code }, relations: ["items"] });
        if (!invoice) throw new Error("Invoice not found");

        let totalTax = 0;
        invoice.items.forEach(item => {
            if (item.taxType === 'ICMS' || item.taxType === 'ISS') {
                totalTax += item.total * (item.taxRate / 100);
            }
        });

        // adiciona totalTax dinamicamente
        return {
            ...invoice,
            totalTax
        };
    };

    async listInvoicesByCompany(companyId: string) {
        const invoices = await this.invoiceRepo.find(
            {
                where: {
                    company: { id: companyId },
                    status: InvoiceStatus.ACTIVE,
                },
                relations: ["company", "client", "items"],
                order: { issuedAt: "DESC" }
            }
        );
        if (!invoices || invoices.length === 0) {
            throw new Error("No invoices found for this company");
        };
        return invoices;
    };

    async cancelInvoice(invoiceId: string) {
        const invoice = await this.invoiceRepo.findOne({ where: { id: invoiceId } });
        if (!invoice) throw new Error("Invoice not found");

        invoice.status = InvoiceStatus.CANCELLED;
        return await this.invoiceRepo.save(invoice);
    };

};

export default new InvoiceRepository();