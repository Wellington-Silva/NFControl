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

    async registerCompany(name: string, cnpj: string, email: string, password: string, address: string, city: string, state: string) {
        const companyData = {
            name, 
            cnpj,
            email,
            password,
            address,
            city,
            state
        };

        const updatedCompany = await CompanyRepository.create(companyData);
        return updatedCompany;
    };

    async updateCompany(id: string, name: string, cnpj: string, email: string, password: string, address: string, city: string, state: string) {
        const companyData = {
            name, 
            cnpj,
            email,
            password,
            address,
            city,
            state
        };

        const company = await CompanyRepository.update(id, companyData);
        return company;
    };

    async deleteCompany(id: string) {
        await CompanyRepository.delete(id);
    };
};

export default new CompanyService();