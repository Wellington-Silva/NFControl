import { Invoice } from "../entities/Invoice";
import { InvoiceType } from '../entities/Invoice';
import InvoiceRepository from "../repositories/InvoiceRepositoy";

class InvoiceService {

    async emissionInvoice(data: Invoice, companyId: string, clientId: string) {
        if (!data) {
            throw new Error("Dados da nota fiscal não foram fornecidos");
        }

        const invoiceData = {
            ...data,
            companyId,
            clientId,
            type: data.type === 'NF-e' ? InvoiceType.NFE : InvoiceType.NFSE,
            items: data.items?.map(item => ({
                ...item,
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice,
                total: item.total,
                taxType: item.taxType,
                taxRate: item.taxRate,
            }))
        };

        const invoice = await InvoiceRepository.createInvoice(invoiceData);
        if (!invoice) throw new Error("Falha ao criar a nota fiscal");

        // Calcular os impostos
        const invoiceWithTax = await InvoiceRepository.calcTax(invoice.invoiceCode);

        return invoiceWithTax;
    };

    async consultationInvoice(invoiceId: string) {
        const invoice = await InvoiceRepository.consultationInvoice(invoiceId);
        if (!invoice) throw new Error("Invoice not found");
        return invoice;
    };

    async validationInvoice(code: string) {
        const result = await InvoiceRepository.validationInvoice(code);
        if (!result.valid)
            return result;
        
        return result;
    };

    async cancelInvoice(invoiceId: string) {
        const canceledInvoice = await InvoiceRepository.cancelInvoice(invoiceId);
        if (!canceledInvoice) throw new Error("Invoice not found or already cancelled");
        return canceledInvoice;
    };

    async emissionHistory(companyId: string) {
        const invoices = await InvoiceRepository.listInvoicesByCompany(companyId);
        if (!invoices || invoices.length === 0) {
            throw new Error("No invoices found for this company");
        }
        return invoices;
    };

};

export default new InvoiceService();