import { Request, Response } from "express";
import InvoiceService from "../services/InvoiceService";

class InvoiceController {

    async issue(req: Request, res: Response) {
        try {
            const { companyId, clientId } = req?.query;
            const data = req.body;

            if (typeof companyId !== 'string' || typeof clientId !== 'string') {
                return res.status(400).json({ error: "Company ID and Client ID must be strings" });
            };

            const invoice = await InvoiceService.issueInvoice(data, companyId, clientId);
            res.status(201).json(invoice);
        } catch (error) {
            res.status(400).json({ error: true, message: "Failed to issue invoice" });
        }
    };

    async consultation(req: Request, res: Response) {
        const { invoiceId } = req?.query;
        if (!invoiceId) {
            return res.status(400).json({ error: "Invoice ID is required" });
        }
        const invoice = await InvoiceService.consultationInvoice(invoiceId as string);
        res.json(invoice);
    };

    async validation(req: Request, res: Response) {

    };

};

export default new InvoiceController();