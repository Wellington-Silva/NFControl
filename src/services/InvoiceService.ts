import { Invoice } from "../entities/Invoice";
import { InvoiceType } from '../entities/Invoice';
import InvoiceRepositoy from "../repositories/InvoiceRepositoy";

class InvoiceService {

    async issueInvoice(data: Invoice, companyId: string, clientId: string) {
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

        const invoice = await InvoiceRepositoy.createInvoice(invoiceData);
        if (!invoice) throw new Error("Falha ao criar a nota fiscal");
        return invoice;
    };

    async consultationInvoice(invoiceId: string) {
        const invoice = await InvoiceRepositoy.consultationInvoice(invoiceId);
        if (!invoice) throw new Error("Invoice not found");
        return invoice;
    };

    async validationInvoice(invoiceId: string) {

    };

};

export default new InvoiceService();