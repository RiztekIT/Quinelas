import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashModel, DashResponse } from '../models/dashboard.model';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';
import { InfoResponse } from 'app/models/info.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private url = "https://riztek.com.mx/php/Quinelas";
  constructor( private http: HttpClient, private userService: UserService) { 

  }




  /**
   * API functions
   */

  getDashboard(){
    let userToken = this.userService.getToken();
    return this.http.get<DashResponse>(
      `${this.url}/GET_dashboard.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 

  getInfo(){
    let userToken = this.userService.getToken();
    return this.http.get<InfoResponse>(
      `${this.url}/GET_info.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 




}
