export interface ClientResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: ClientModel[];
}



export class ClientModel{
    ID_Client: number;
    ID_User: number;
    Name: string;
    LastName: string;
    Email: string;
    Phone: string;
    Notes: string;
    Created: string;
    Updated: string;
}