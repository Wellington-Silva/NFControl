import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import CompanyService from '../services/CompanyService';

interface ICompany {
    name: string;
    cnpj: string;
    email: string;
    password: string;
    address: string;
    city: string;
    state: string;
};

class CompanyController {

    async login(req: Request, res: Response) {
        const { email, password } = req?.body as { email: string; password: string };
        const result = await AuthService.loginCompany(email, password);
        res.json(result);
    };

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
        const {
            name,
            cnpj,
            email,
            password,
            phone,
            address,
            number,
            complement,
            neighborhood,
            city,
            state,
            cep,
            municipalCode,
            ie,
            im,
            cnae,
            taxRegime,
            environment
        } = req.body;

        try {
            const company = await CompanyService.registerCompany({
                name,
                cnpj,
                email,
                password,
                phone,
                address,
                number,
                complement,
                neighborhood,
                city,
                state,
                cep,
                municipalCode,
                ie,
                im,
                cnae,
                taxRegime,
                environment
            });

            res.status(201).json(company);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar empresa', error });
        }
    };

    async update(req: Request, res: Response) {
        const { id } = req?.query;
        const { name, cnpj, email, password, address, city, state } = req?.body as ICompany;
        const company = await CompanyService.updateCompany(id as string, name, cnpj, email, password, address, city, state);
        res.json(company);
    };

    async delete(req: Request, res: Response) {
        const { id } = req?.query;
        await CompanyService.deleteCompany(id as string);
        res.json({ error: false, message: "Company deleted" });
    };

};

export default new CompanyController();