import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientModel, ClientResponse } from '../models/clients.model';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "https://riztek.com.mx/php/Quinelas";
  constructor( private http: HttpClient, private userService: UserService) { 

  }


  /**
   * API functions
   */

  getClients(  ){
    let userToken = this.userService.getToken();
    return this.http.get<ClientResponse>(
      `${this.url}/GET_clients.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  postClient(client:ClientModel ){

    //Add the token to the client model to set the parent user.
    let userToken = this.userService.getToken();
    const clientWithUserToken = {
      ... client,
      userToken
    }

    return this.http.post<ClientResponse>(
      `${this.url}/POST_client.php`, clientWithUserToken,
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
