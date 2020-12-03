export interface InfoResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: InfoModel[];
}



export class InfoModel{
    Version: string;
    Server: string;
    Updated: string;
    Help: string;
    Emergency: string;
}