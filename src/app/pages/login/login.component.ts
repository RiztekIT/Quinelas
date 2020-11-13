import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'app/models/users.model';
import { UserService } from 'app/services/user.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: UserModel;
  rememberme = false;

  constructor( private UserService: UserService,
               private router: Router) { }

  ngOnInit() {
    localStorage.removeItem("Token");
    this.user = new UserModel();
    if( localStorage.getItem('Email') ){
     this.user.Email =  localStorage.getItem('Email');
     this.rememberme = true;
    }
  }
  onSubmit(loginForm:NgForm){
    if (loginForm.invalid) { return; }

   

    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    this.UserService.login(this.user).subscribe( resp =>{
      if(resp.statusID == 200){
        console.log(resp.data[0]);
        Swal.close();
        if( this.rememberme ){
          localStorage.setItem('Email', this.user.Email);
        }
        this.router.navigateByUrl('/user-profile');
      }else{
        Swal.fire({
          text: resp.statusDescription,
          icon: 'error'
        });
      }
    })
  }
}
