import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import  Swal  from 'sweetalert2';
import { BetsService } from 'app/services/bets.service';
import { BetModel } from 'app/models/bets.model';
import { ClientService } from 'app/services/client.service';
import { ClientModel, ClientResponse } from 'app/models/clients.model';
@Component({
  selector: 'app-bets-dialog',
  templateUrl: './bets-dialog.component.html',
  styleUrls: ['./bets-dialog.component.css']
})
export class BetsDialogComponent implements OnInit {
  
  bet: BetModel;
  clients:any;
  constructor(
    public dialogRef: MatDialogRef<BetsDialogComponent>,
    private betService: BetsService,
    private clientService: ClientService) {


    }

  ngOnInit(): void {
    this.getClients();
    this.bet  = new BetModel();
  }

  getClients(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.clientService.getClients().subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.clients = resp.data;
        console.log(this.clients);
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
  }



  onClose() {
    console.log("---Cerrando modal ---");
    this.dialogRef.close();
  }


  onSubmit(betForm:NgForm){
    if (betForm.invalid) { return; }
    Swal.fire({
      icon: 'warning',
      title: 'Asegurese de que el número es el correcto: '+ this.bet.Number +
              ' y de que la cantidad es la correcta: '+ this.bet.Bet + ' una vez que la apuesta se genera no se puede editar ó eliminar.',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#9e9e9e',
      confirmButtonText: `Generar apuesta`,
      confirmButtonColor: '#f44336',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postBet();
      } 
    });
  }


  postBet(){
    Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor...',
    icon: 'info'
    });
    Swal.showLoading();
    this.betService.postBet(this.bet).subscribe( resp =>{
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
  }



}
