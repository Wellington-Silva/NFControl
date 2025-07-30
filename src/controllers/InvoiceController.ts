import { Request, Response } from "express";
import InvoiceService from "../services/InvoiceService";

class InvoiceController {

    async emission(req: Request, res: Response) {
        try {
            const { companyId, clientId } = req?.query;
            const data = req.body;

            if (!data || typeof data !== 'object') {
                return res.status(400).json({ error: true, message: "Corpo da requisição inválido" });
            }

            if (typeof companyId !== 'string' || typeof clientId !== 'string') {
                return res.status(400).json({ error: "Company ID and Client ID must be strings" });
            };

            const invoice = await InvoiceService.emissionInvoice(data, companyId, clientId);
            res.status(201).json(invoice);
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: true, message: "Failed to emission invoice" });
        }
    };

    async consultation(req: Request, res: Response) {
        try {
            const { code } = req?.query;
            if (!code) {
                return res.status(400).json({ error: "Invoice ID is required" });
            }
            const invoice = await InvoiceService.consultationInvoice(code as string);
            res.json(invoice);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    };

    async validation(req: Request, res: Response) {
        try {
            const { code } = req?.query;
            const validation = await InvoiceService.validationInvoice(code as string);
            res.json(validation);
        } catch (error) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
            
        }
    };

    async history(req: Request, res: Response) {
        try {
            const companyId = (req as any).companyId; 
            if (!companyId) {
                return res.status(400).json({ error: "Você não está autenticado. Faça login e tente novamente" });
            }
            const invoices = await InvoiceService.emissionHistory(companyId as string);
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