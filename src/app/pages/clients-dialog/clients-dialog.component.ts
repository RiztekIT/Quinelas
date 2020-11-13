import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientModel } from 'app/models/clients.model'; 
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from 'app/services/client.service';

import  Swal  from 'sweetalert2';


@Component({
  selector: 'app-clients-dialog',
  templateUrl: './clients-dialog.component.html',
  styleUrls: ['./clients-dialog.component.css']
})
export class ClientsDialogComponent{
  cardTitle:string = "Nuevo cliente";
  constructor(
    public dialogRef: MatDialogRef<ClientsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public client: ClientModel,
    private clientService: ClientService) {
      if(client.ID_Client ){
        this.cardTitle = "Editar cliente";
      }
      console.log("---Abriendo modal ---");
      console.log(client);
    }
    onClose() {
      // Set ID_Client = 0 to no refresh the table.
      this.client.ID_Client = 0;
      console.log("---Cerrando modal ---");
      console.log(this.client);
      this.dialogRef.close();
    }
    onSubmit(clientForm:NgForm){
      if (clientForm.invalid) { return; }
      Swal.fire({
        allowOutsideClick: false,
        text: 'Espere por favor...',
        icon: 'info'
      });
      Swal.showLoading();

      if(this.client.ID_Client ){
        this.clientService.updateClient(this.client).subscribe( resp =>{
          if(resp.statusID == 200){
            Swal.close();
            this.dialogRef.close();
          }else{
            Swal.fire({
              text: resp.statusDescription,
              icon: 'error'
            });
          }
        });
      }else{
        this.clientService.postClient(this.client).subscribe( resp =>{
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
        });
      }
    
    }
}
