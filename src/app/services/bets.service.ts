import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BetModel, BetsResponse } from '../models/bets.model';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BetsService {

  private url = "https://riztek.com.mx/php/Quinelas";
  constructor( private http: HttpClient, private userService: UserService) { 

  }




  /**
   * API functions
   */

  getBets(){
    let userToken = this.userService.getToken();
    return this.http.get<BetsResponse>(
      `${this.url}/GET_bets.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 


  getBetsWinners(){
    let userToken = this.userService.getToken();
    return this.http.get<BetsResponse>(
      `${this.url}/GET_betsWinners.php?Token=`+userToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 



  postBet(bet:BetModel ){

    //Add the token to the client model to set the parent user.
    let userToken = this.userService.getToken();
    const betWithUserToken = {
      ... bet,
      userToken
    }

    return this.http.post<BetsResponse>(
      `${this.url}/POST_bet.php`, betWithUserToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 



  postValidateBetsAmount(bet:BetModel ){

    //Add the token to the client model to set the parent user.
    let userToken = this.userService.getToken();
    const betWithUserToken = {
      ... bet,
      userToken
    }

    return this.http.post<BetsResponse>(
      `${this.url}/POST_validateBetsAmount.php`, betWithUserToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  }
  
  
  postpayBetTicket(qr:string ){

    //Add the token to the client model to set the parent user.
    let userToken = this.userService.getToken();
    let betsGroup = qr;
    const betWithUserToken = {
      betsGroup,
    userToken
    }

    return this.http.post<BetsResponse>(
      `${this.url}/POST_payBetTickets.php?betsGroup=`+qr, betWithUserToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 






}
