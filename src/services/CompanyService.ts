import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CompanyRepository from "../repositories/CompanyRepository";

class CompanyService {

    async listCompanies() {
        const companies = await CompanyRepository.findAll();
        return companies;
    };

    async showCompany(id: string) {
        const company = await CompanyRepository.findById(id);
        return company;
    };

    async registerCompany(data: {
        name: string;
        cnpj: string;
        email: string;
        password: string;
        phone: string;
        address: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        cep: string;
        municipalCode: string;
        ie: string;
        im: string;
        cnae: string;
        taxRegime: string;
        environment?: string;
    }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const companyData = {
            ...data,
            password: hashedPassword,
            active: true,
            environment: data.environment || 'homologation'
        };

        const createdCompany = await CompanyRepository.create(companyData);

        const companyJWT = {
            id: createdCompany.id,
            name: createdCompany.name,
            email: createdCompany.email,
            cnpj: createdCompany.cnpj,
            active: createdCompany.active,
            environment: createdCompany.environment
        }


        try {
            const token = jwt.sign(
                companyJWT,
                process.env.JWT_SECRET as string, {
                expiresIn: '2d'
            });
            return { token };
        } catch (error) {
            console.error("Erro ao gerar o token JWT:", error);
            throw new Error("Erro ao criar o token JWT.");
        }
    };

    async updateCompany(
        id: string,
        name: string,
        cnpj: string,
        email: string,
        password: string,
        phone: string,
        address: string,
        number: string,
        complement: string,
        neighborhood: string,
        city: string,
        state: string,
        cep: string,
        municipalCode: string,
        ie: string,
        im: string,
        cnae: string,
        taxRegime: string,
        environment: string) {

        const companyData = {
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
        };

        const company = await CompanyRepository.update(id, companyData);
        return company;
    };

    async deleteCompany(id: string) {
        await CompanyRepository.delete(id);
    };
};

export default new CompanyService();