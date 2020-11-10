import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserResponse } from '../models/users.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://riztek.com.mx/php/Quinelas";

  Token:string;
  Name:string;
  constructor( private http: HttpClient) { 

  }


  /**
   * API functions
   */
  postUser( user:UserModel ){
    return this.http.post<UserResponse>(
      `${this.url}/POST_user.php`, user,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 

  getUserByToken(){
    return this.http.get<UserResponse>(
      `${this.url}/GET_userByToken.php?Token=${this.Token}`,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 

  login( user:UserModel ){
    return this.http.post<UserResponse>(
      `${this.url}/GET_userSession.php`, user,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    ).pipe(
      map( resp=>{

        if(resp.statusID == 200){
          console.log(resp.data[0].Token);
          this.setUser(resp.data[0].Token, resp.data[0].Name + " " +resp.data[0].LastName);
        }
         return resp;
      })
    )
  } 






  /**
   * Local functions
   */
  setUser(Token: string, Name: string){
    this.Token = Token;
    this.Name = Name;
    localStorage.setItem('Token', Token);
    localStorage.setItem('Name', Name);
  }

  getToken(){
    if( localStorage.getItem('Token') ){
      this.Token = localStorage.getItem('Token');
    }else{
      this.Token = '';
    }
    return this.Token;
  }

  getUserName(){
    if( localStorage.getItem('Name') ){
      this.Name = localStorage.getItem('Name');
    }else{
      this.Name = '';
    }
    return this.Name;
  }

  isLoged():boolean{

    if ( this.getToken() ) {
      return true;
    }else{
      return false;
    }

  }



}
