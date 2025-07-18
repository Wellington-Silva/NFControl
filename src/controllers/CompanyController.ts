import { Request, Response } from 'express';
import CompanyService from '../services/CompanyService';

interface ICompany {
    name: string;
    cnpj: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
}

class CompanyController {

    async list(req: Request, res: Response) {
        const companies = await CompanyService.listCompanies();
        res.json(companies);
    };

    async show(req: Request, res: Response) {
        const { id } = req?.query;
        const company = await CompanyService.showCompany(id as string);
        res.json(company);
    };

    async register(req: Request, res: Response) {
        const { name, cnpj, email, password, address, city, state } = req?.body as ICompany;
        const company = await CompanyService.registerCompany(name, cnpj, email, password, address, city, state);
        res.status(201).json(company);
    };

    async login(req: Request, res: Response) {

    };

};

export default new CompanyController();