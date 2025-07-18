import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import AuthRepository from "../repositories/AuthRepository";

class AuthService {

    async loginCompany(email: string, password: string) {
        const company = await AuthRepository.findByEmail(email);
        if (!company) {
            return company;
        }

        const isMatch = bcrypt.compareSync(password, company.password);
        if (!isMatch) {
            return { error: true, message: 'Senha inválida' };
        };

        if (!company.active) {
            return { error: true, message: 'Empresa desativada' };
        };

        const userJWT = {
            id: company.id,
            name: company.name,
            email: company.email,
            address: company.address,
            city: company.city,
            state: company.state,
        };

        const token = jwt.sign(
            userJWT,
            process.env.JWT_SECRET as string,
            { expiresIn: "5d" }
        );

        return {
            error: false,
            message: 'Login realizado com sucesso',
            token,
            company: userJWT
        };
    };

};

export default new AuthService();