import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

class ClientController {

    async list (req: Request, res: Response) {
        const clients = await ClientService.listAllClients();
        res.json(clients);
    };

    async getById(req: Request, res: Response) {
        const { id } = req?.query;
        const client = await ClientService.getClientById(id as string);
        res.json(client);
    };

    async create(req: Request, res: Response) {
        const client = await ClientService.createClient(req?.body);
        res.status(201).json(client);
    };

    // async update(req: Request, res: Response) {
    //     const { name, cpfOrCnpj, email, address, city, state } = req?.body as IClient;
    //     const { id } = req?.query;
    //     const updatedClient = await ClientService.updateClient(id as string, name, cpfOrCnpj, email, address, city, state);
    //     res.json(updatedClient);
    // };

    async delete(req: Request, res: Response) {
        const { id } = req?.query;
        const result = await ClientService.deleteClient(id as string);
        res.json(result);
    };

};

export default new ClientController();