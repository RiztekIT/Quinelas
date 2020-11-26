import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'app/models/users.model'; 
import { UserService } from 'app/services/user.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user:UserModel;
  userID:number;


  constructor(private UserService: UserService,) {
   }

  ngOnInit() {
    this.user = new UserModel();
    this.getUser();
  }

getUser(){
  Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor...',
    icon: 'info'
  });
  Swal.showLoading();
  this.UserService.getUserByToken().subscribe( resp =>{
    if(resp.statusID == 200){
      Swal.close();
      this.user = resp.data[0];
    }else{
        Swal.fire({
          text: resp.statusDescription,
          icon: 'error'
        });
    }
  });
}


  onSubmit(profileForm:NgForm){
    if (profileForm.invalid) { return; }
    console.log(profileForm);


    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    this.UserService.updateUser(this.user).subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        Swal.fire({
          text: resp.statusDescription,
          icon: 'success'
        });
      }else{
        Swal.fire({
          text: resp.statusDescription,
          icon: 'error'
        });
      }
    })



  }
}
