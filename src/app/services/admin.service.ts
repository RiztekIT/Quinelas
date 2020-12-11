import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DashModel, DashResponse } from '../models/dashboard.model';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';
import { InfoResponse } from 'app/models/info.model';
import { BetsResponse } from 'app/models/bets.model';
import { ConfigModel, ConfigResponse } from 'app/models/config.model';
import { BetsWinnerModel, BetsWinnerResponse } from 'app/models/betsWinners.model';

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


  getAdminBets(){
    let userToken = this.userService.getToken();
    return this.http.get<BetsResponse>(
      `${this.url}/GET_adminBets.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 

  getAdminBetsWinners(){
    let userToken = this.userService.getToken();
    return this.http.get<BetsResponse>(
      `${this.url}/GET_adminBetsWinners.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 



  postBetsWinner(betsWinner:BetsWinnerModel){
    //Add the token to the client model to set the parent user.
    let userToken = this.userService.getToken();
    const BetsWinnersWithUserToken = {
      ... betsWinner,
      userToken
    }
    console.log(BetsWinnersWithUserToken);
    return this.http.post<BetsWinnerResponse>(
      `${this.url}/POST_adminBetsWinners.php`, BetsWinnersWithUserToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 






  getConfig(){
    let userToken = this.userService.getToken();
    return this.http.get<ConfigResponse>(
      `${this.url}/GET_config.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  updateConfig(config:ConfigModel ){
    return this.http.post<ConfigResponse>(
      `${this.url}/UPDATE_config.php`, config,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 






}
