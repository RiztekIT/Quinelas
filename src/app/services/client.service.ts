import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel, ClientResponse } from '../models/clients.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "https://riztek.com.mx/php/Quinelas";

  Token:string;
  Name:string;
  constructor( private http: HttpClient) { 

  }


  /**
   * API functions
   */

  getClients(  ){
    return this.http.get<ClientResponse>(
      `${this.url}/GET_clients.php`,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  postClient(client:ClientModel ){
    return this.http.post<ClientResponse>(
      `${this.url}/POST_client.php`, client,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  updateClient(client:ClientModel ){
    return this.http.post<ClientResponse>(
      `${this.url}/UPDATE_client.php`, client,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  deleteClient(ID_Client:number){
    return this.http.get<ClientResponse>(
      `${this.url}/DELETE_client.php?ID_Client=${ID_Client}`,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  /**
   * Local functions
   */
  



}
