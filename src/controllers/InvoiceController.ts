import { Request, Response } from "express";
import InvoiceService from "../services/InvoiceService";

class InvoiceController {

    async issue(req: Request, res: Response) {
        try {
            const { companyId, clientId } = req?.query;
            const data = req.body;

            if (!data || typeof data !== 'object') {
                return res.status(400).json({ error: true, message: "Corpo da requisição inválido" });
            }

            if (typeof companyId !== 'string' || typeof clientId !== 'string') {
                return res.status(400).json({ error: "Company ID and Client ID must be strings" });
            };

            const invoice = await InvoiceService.issueInvoice(data, companyId, clientId);
            res.status(201).json(invoice);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: true, message: "Failed to issue invoice" });
        }
    };

    async consultation(req: Request, res: Response) {
        try {
            const { invoiceId } = req?.query;
            if (!invoiceId) {
                return res.status(400).json({ error: "Invoice ID is required" });
            }
            const invoice = await InvoiceService.consultationInvoice(invoiceId as string);
            res.json(invoice);
        } catch (error) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    };

    async validation(req: Request, res: Response) {

    };

    async list(req: Request, res: Response) {
        try {
            const { companyId } = req?.query;
            if (!companyId) {
                return res.status(400).json({ error: "Company ID is required" });
            }
            const invoices = await InvoiceService.listInvoices(companyId as string);
            res.json(invoices);
        } catch (error) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    };

    async cancel(req: Request, res: Response) {
        try {
            const { invoiceId } = req?.query;
            if (!invoiceId) {
                return res.status(400).json({ error: "Invoice ID is required" });
            }
            const canceledInvoice = await InvoiceService.cancelInvoice(invoiceId as string);
            res.json(canceledInvoice);
        } catch (error) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    };

};

export default new InvoiceController();