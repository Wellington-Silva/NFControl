import { Client } from "../entities/Client";
import { AppDataSource } from "../database/ormconfig";

class ClientRepository {

    constructor(
        private clientRepo = AppDataSource.getRepository(Client)
    ) {};

    async listAllClients(): Promise<Client[]> {
        const clients = await this.clientRepo.find();
        if (!clients.length) throw new Error("No clients found");
        return clients;
    };

    async getClientById(id: string): Promise<any> {
        const client = await this.clientRepo.findOne({ where: { id } });
        if (!client) throw new Error("Client not found");
        return client;
    };

    async createClient(clientData: Partial<Client>): Promise<Client> {
        const client = this.clientRepo.create(clientData);
        await this.clientRepo.save(client);
        return client;
    };

    async updateClient(clientData: Partial<Client>): Promise<Client> {
        const client = await this.clientRepo.findOne({ where: { id: clientData.id } });
        if (!client) throw new Error("Client not found");
        
        Object.assign(client, clientData);
        await this.clientRepo.save(client);
        return client;
    };

    async deleteClient(id: string): Promise<void> {
        const client = await this.clientRepo.findOne({ where: { id } });
        if (!client) throw new Error("Client not found");
        await this.clientRepo.remove(client);
    };

};

export default new ClientRepository();