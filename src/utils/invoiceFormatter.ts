import { Invoice } from "../entities/Invoice";

export function formatInvoice(invoice: Invoice) {
    const filteredCompany = invoice.company
        ? {
            id: invoice.company.id,
            name: invoice.company.name,
            cnpj: invoice.company.cnpj,
            email: invoice.company.email,
            phone: invoice.company.phone,
            cep: invoice.company.cep,
        }
        : null;

    const filteredClient = invoice.client
        ? {
            id: invoice.client.id,
            name: invoice.client.name,
            cpfOrCnpj: invoice.client.cpfOrCnpj,
            email: invoice.client.email,
            phone: invoice.client.phone,
            cep: invoice.client.cep,
        }
        : null;

    return {
        id: invoice.id,
        invoiceCode: invoice.invoiceCode,
        total: invoice.total,
        emissionDate: invoice.issuedAt,
        status: invoice.status,
        type: invoice.type,
        company: filteredCompany,
        client: filteredClient,
        items: invoice.items
    };
};