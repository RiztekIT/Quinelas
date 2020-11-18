export interface BetsResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: BetModel[];
}



export class BetModel{
    ID_Bet: number;
    ID_Client: number;
    Number: number;
    Bet: number;
    Created: string;
}