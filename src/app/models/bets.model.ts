export interface BetsResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: BetModel[];
}



export class BetModel{
    ID_Bet: number;
    ID_Client: number;
    ID_Group: string;
    Date: string;
    Number: number;
    Bet: number;
    BetsString: string;
    Created: string;
}