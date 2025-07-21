import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import CompanyService from '../services/CompanyService';

class CompanyController {

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req?.body as { email: string; password: string };
            const result = await AuthService.loginCompany(email, password);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Erro ao fazer login' });
        }
    };

    async list(req: Request, res: Response) {
        try {
            const companies = await CompanyService.listCompanies();
            res.json(companies);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Erro ao listar empresas' });
        }
    };

    async show(req: Request, res: Response) {
        try {
            const { id } = req?.query;
            const company = await CompanyService.showCompany(id as string);
            res.json(company);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Erro ao mostrar empresa' });
        }
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
            res.status(500).json({ error: true, message: 'Erro ao cadastrar empresa' });
        }
    };

    async update(req: Request, res: Response) {
        const { id } = req?.query;
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
            environment } = req?.body;

        const company = await CompanyService.updateCompany(
            id as string,
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
        );
        res.json(company);
    };

    async delete(req: Request, res: Response) {
        try {
            const { id } = req?.query;
            await CompanyService.deleteCompany(id as string);
            res.json({ error: false, message: "Company deleted" });
        } catch (error) {
            res.status(500).json({ error: true, message: 'Erro ao deletar empresa' });
        }
    };

};

export default new CompanyController();