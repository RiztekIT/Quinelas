export interface UserResponse{
    statusID: number;
    statusName: string;
    statusDescription: string;
    data: UserModel[];
}



export class UserModel{
    ID_User: number;
    Name: string;
    LastName: string;
    FullName: number;
    Address: string;
    AddressZipCode: string;
    AddressState: string;
    AddressCity: string;
    AboutMe: string;
    Phone: string;
    Type: string;
    Email: string;
    Password: string;
    Token: string;
    AmountBets: number;
    SalesGoal: number;
    Created: string;
    Updated: string;
}