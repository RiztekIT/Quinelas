import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'app/models/users.model'; 
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from 'app/services/client.service';

import  Swal  from 'sweetalert2';
import { UserService } from 'app/services/user.service';


@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.css']
})
export class UsersDialogComponent{
  cardTitle:string = "Nuevo usuario";
  constructor(
    public dialogRef: MatDialogRef<UsersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public user: UserModel,
    private userService: UserService) {
      if(user.ID_User ){
        this.cardTitle = "Editar usuario";
      }
      console.log("---Abriendo modal ---");
      console.log(user);
    }
    onClose() {
      // Set ID_Client = 0 to no refresh the table.
      this.user.ID_User = 0;
      console.log("---Cerrando modal ---");
      console.log(this.user);
      this.dialogRef.close();
    }
    onSubmit(userForm:NgForm){
      if (userForm.invalid) { return; }
      Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        icon: 'info'
      });
      Swal.showLoading();

      if(this.user.ID_User ){
        this.userService.updateUser(this.user).subscribe( resp =>{
          if(resp.statusID == 200){

          Swal.fire({
            allowOutsideClick: false,
            text: resp.statusDescription,
            icon: 'success',
            confirmButtonText: `Ok`
          }).then((result) => {
            Swal.close();
            this.dialogRef.close();
          })

          }else{
            Swal.fire({
              text: resp.statusDescription,
              icon: 'error'
            });
          }
        });
      }else{
        /*this.userService.postU(this.client).subscribe( resp =>{
          if(resp.statusID == 200){
            this.client.ID_Client = resp.data[0].ID_Client; // Set the client ID to make an ifelse in the clients compone to know if refresh or no the clients list.
            Swal.close();
            this.dialogRef.close();
          }else{
            Swal.fire({
                text: resp.statusDescription,
                icon: 'error'
            });
          }
        });*/
      }
    
    }
}
