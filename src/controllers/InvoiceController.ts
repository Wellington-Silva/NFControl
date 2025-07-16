import { Request, Response } from "express";

class InvoiceController {

    async emission(req: Request, res: Response) {
        const {  } = req?.body;
        res.json();
    };

    async consultation() {

    };

    async validation() {

    };
};

export default new InvoiceController();