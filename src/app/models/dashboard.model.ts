export interface DashResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: DashModel[];
}



export class DashModel{
    TotalBets: string;
    AmountBets: string;
    TotalClients: string;
    TotalUsers: string;
}