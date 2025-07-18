import { AppDataSource } from "../database/ormconfig"
import { Company } from "../entities/Company";

class AuthRepository {

    constructor(
        private companyRepo = AppDataSource.getRepository(Company)
    ) {};

    async findByEmail(email: string) {
        return await this.companyRepo.findOne(
            { 
                where: { email },
                select: ["id", "name", "email", "password", "address", "city", "state", "active"], 
            }
        );
    };

};

export default new AuthRepository();