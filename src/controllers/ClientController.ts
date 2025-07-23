import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

class ClientController {

    async list(req: Request, res: Response) {
        try {
            const clients = await ClientService.listAllClients();
            res.json(clients);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    };

    async getById(req: Request, res: Response) {
        try {
            const { id } = req?.query;
            const client = await ClientService.getClientById(id as string);
            res.json(client);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    };

    async create(req: Request, res: Response) {
        try {
            const client = await ClientService.createClient(req?.body);
            res.status(201).json(client);
        } catch (error) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    };

    // async update(req: Request, res: Response) {
    //     const { name, cpfOrCnpj, email, address, city, state } = req?.body as IClient;
    //     const { id } = req?.query;
    //     const updatedClient = await ClientService.updateClient(id as string, name, cpfOrCnpj, email, address, city, state);
    //     res.json(updatedClient);
    // };

    async delete(req: Request, res: Response) {
        try {
            const { id } = req?.query;
            const result = await ClientService.deleteClient(id as string);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
    };

};

export default new ClientController();