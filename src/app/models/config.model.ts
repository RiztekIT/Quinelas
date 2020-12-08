export interface ConfigResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: ConfigModel[];
}



export class ConfigModel{
    ID_Config: number;
    MaxAmount: number;
    Created: string;
    Updated: string;
}