import bcrypt from "bcrypt";
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
        return createdCompany;
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