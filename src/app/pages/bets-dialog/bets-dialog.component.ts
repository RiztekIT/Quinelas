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

  client = new ClientModel();
  betValues = [];
  bet: BetModel;
  clients:any;
  constructor(
    public dialogRef: MatDialogRef<BetsDialogComponent>,
    private betService: BetsService,
    private clientService: ClientService) {
      this.client  = new ClientModel();
      this.betValues.push(
        {
          Number: "",
          Bet: ""
        });

    }


    removevalue(i){
      this.betValues.splice(i,1);
    }
  
    addvalue(){
      this.betValues.push(
        {
          Number: "",
          Bet: ""
        });


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

    var table = "";
    for (var x of this.betValues) {
      table += `<tr>
                      <td>${x.Number}</td>
                      <td>$${x.Bet}</td>
                  </tr>`;
    }

    table = `<table border=1 width="100%"> 
      <tr>
        <th>Número</th>
        <th>Apuesta</th>
      </tr>
       ${table}
    </table>`;


    Swal.fire({
      icon: 'warning',
      title: 'Asegurese de que los números y de que las apuestas son las correctas, una vez que las apuestas se genera no se pueden editar ó eliminar.',
      html: table,
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#9e9e9e',
      confirmButtonText: `Generar apuesta`,
      confirmButtonColor: '#f44336',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        //if(this.bet.ID_Client == -1){
        //  console.log("hacer apuestas y creear usuario")
        //}else{
          this.postBet();
        //}
      } 
    });
  }


  postBet(){

    var localBets = "";
    for (var x of this.betValues) {
      localBets += `${x.Number}:${x.Bet},`;
    }
    this.bet.BetsString = localBets;
    console.log(this.bet.BetsString);
    Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor...',
    icon: 'info'
    });
    Swal.showLoading();
    this.betService.postBet(this.bet).subscribe( resp =>{
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
  }



}
