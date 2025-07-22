import ClientRepository from "../repositories/ClientRepository";

class ClientService {

    async listAllClients() {
        const clients = await ClientRepository.listAllClients();
        return clients;
    };

    async getClientById(id: string) {
        const client = await ClientRepository.getClientById(id);
        return client;
    };

    async createClient(data: {
        name: string;
        cpfOrCnpj: string;
        email: string;
        address: string;
        city: string;
        state: string;
        phone?: string;
        cep?: string;
        number?: string;
        complement?: string;
        neighborhood?: string;
        municipalCode?: string;
        ie?: string;
        im?: string;
    }) {
        const clientData = {
            ...data,
            type: (data.cpfOrCnpj.length === 11 ? 'individual' : 'company') as 'individual' | 'company',
            active: true
        };

        const client = await ClientRepository.createClient(clientData);
        return client;
    };

    async updateClient(id: string, name: string, cpfOrCnpj: string, email: string, address: string, city: string, state: string) {
        const clientData = {
            id,
            name,
            cpfOrCnpj,
            email,
            address,
            city,
            state
        };
        const client = await ClientRepository.updateClient(clientData);
        return client;
    };

    async deleteClient(id: string) {
        await ClientRepository.deleteClient(id);
        return { error: true, message: "Client deleted successfully" };
    };

};

export default new ClientService();