import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel, UserResponse } from '../models/users.model';
import { map } from 'rxjs/operators'
import  Swal  from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "https://riztek.com.mx/php/Quinelas";

  Token:string;
  constructor( 
    private http: HttpClient,
    private router: Router) { 

  }


  /**
   * API functions
   */

  getUsers(  ){
    return this.http.get<UserResponse>(
      `${this.url}/GET_users.php`,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 



  postUser(user:UserModel ){

    //Add the token to the user model to set the parent user.
    let userToken = this.getToken();
    const userWithUserToken = {
      ... user,
      userToken
    }

    return this.http.post<UserResponse>(
      `${this.url}/POST_user.php`, userWithUserToken,
      {
        headers : {
            'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
    )
  } 



  updateUser( user:UserModel ){
    return this.http.post<UserResponse>(
      `${this.url}/UPDATE_user.php`, user,
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

  logout(){
    Swal.fire({
      icon: 'warning',
      title: 'Seguro que desea salir?',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#9e9e9e',
      confirmButtonText: `Sair`,
      confirmButtonColor: '#f44336',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigateByUrl('/login');
      } 
    });
  }




  /**
   * Local functions
   */
  setUser(Token: string, Name: string){
    this.Token = Token;
    localStorage.setItem('Token', Token);
  }

  getToken(){
    if( localStorage.getItem('Token') ){
      this.Token = localStorage.getItem('Token');
    }else{
      this.Token = '';
    }
    return this.Token;
  }


  isLoged():boolean{

    if ( this.getToken() ) {
      return true;
    }else{
      return false;
    }

  }



}
