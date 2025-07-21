import InvoiceRepositoy from "../repositories/InvoiceRepositoy";
import { Invoice } from "../entities/Invoice";

class InvoiceService {

    async issueInvoice(data: Invoice, companyId: string, clientId: string) {
        const invoiceData = {
            ...data,
            companyId,
            clientId
        };

        const invoice = await InvoiceRepositoy.createInvoice(invoiceData);
        if (!invoice) throw new Error("Failed to create invoice");
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