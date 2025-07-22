import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    company?: {
        id: string;
        name: string;
        email: string;
        cnpj: string;
        active: boolean;
        environment: string;
    };
    companyId?: string;
};

const authMiddleware: RequestHandler = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: true, message: "Token não fornecido" });
        return;
    };

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).json({ error: true, message: "Token malformado" });
        return;
    };

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
        
        // Adds company data to the request
        req.company = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email,
            cnpj: decoded.cnpj,
            active: decoded.active,
            environment: decoded.environment
        };

        req.companyId = String(decoded.id);

        next();
    } catch (error) {
        console.error("Erro ao validar token:", error);
        res.status(401).json({ error: true, message: "Token inválido" });
        return;
    }
};

export default authMiddleware;