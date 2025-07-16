import { Company } from "../entities/Company";
import { AppDataSource } from "../database/ormconfig";

class CompanyRepository {

    constructor(
        private companyRepo = AppDataSource.getRepository(Company)
    ) {};

    async findAll(): Promise<Company[] | {}> {
        const companies = await this.companyRepo.find({ where: { active: true } });
        if (!companies || companies.length === 0) 
            return { error: true, message: "Companies not found" };
        return companies;
    }

    async findById(id: string): Promise<Company | {}> {
        const company = await this.companyRepo.findOne({ where: { id } });
        if (!company) return { error: true, message: "Company not found" };
        return company;
    }

    async create(companyData: Partial<Company>): Promise<Company> {
        const companyPartialData = this.companyRepo.create(companyData);
        const company = await this.companyRepo.save(companyPartialData);
        return company;
    };

    async update(id: string, companyData: Partial<Company>): Promise<Company> {
        const company = await this.companyRepo.findOne({ where: { id } });
        if (!company) throw new Error("Company not found");

        const updatedCompany = await this.companyRepo.update(id, companyData);
        if (!updatedCompany.affected) throw new Error("Company not updated");

        const companyResult = await this.companyRepo.findOne({ where: { id } });
        if (!companyResult) throw new Error("Company not found");
        
        return companyResult;
    };

    async delete(id: string): Promise<void> {
        const company = await this.companyRepo.update(id, { active: false });
        if (!company.affected) throw new Error("Company not updated");
    };

};

export default new CompanyRepository();