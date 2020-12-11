export interface BetsWinnerResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: BetsWinnerModel[];
}



export class BetsWinnerModel{
    ID_BetWinner: number;
    Number: number;
    Date: string;
    Created: string;
    Updated: string;
}

