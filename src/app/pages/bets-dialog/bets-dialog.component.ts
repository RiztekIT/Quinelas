import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import {FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import  Swal  from 'sweetalert2';
import { BetsService } from 'app/services/bets.service';
import { BetModel } from 'app/models/bets.model';
import { ClientService } from 'app/services/client.service';
import { ClientModel, ClientResponse } from 'app/models/clients.model';
import { isEmptyObject } from 'jquery';
import { AdminService } from 'app/services/admin.service';
import { ConfigModel } from 'app/models/config.model';



@Component({
  selector: 'app-bets-dialog',
  templateUrl: './bets-dialog.component.html',
  styleUrls: ['./bets-dialog.component.css']
})
export class BetsDialogComponent implements OnInit {

  client = new ClientModel();
  betValues = [];
  bet: BetModel;
  config = new ConfigModel ();
  clients:any;
  todayDate = new Date();

  allDates = 'true';
  allDatesDate:any;


  /*myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }*/


  
  constructor(
    private adminService:AdminService,
    public dialogRef: MatDialogRef<BetsDialogComponent>,
    private betService: BetsService,
    private clientService: ClientService) {

      this.setLastHourForBets();
      this.client  = new ClientModel();
      this.betValues.push(
        {
          Number: "",
          Bet: "",
          Date: ""
        });

    }


    
    setLastHourForBets(){
      this.adminService.getConfig().subscribe( resp =>{
        if(resp.statusID == 200){
          this.config = resp.data[0];

          var n = this.todayDate.getHours();
          if(n >= this.config.LastHourForBets){
            // Disable actual day
            this.todayDate.setDate(this.todayDate.getDate() + 1);
          }else{
            // From this day
            this.todayDate.setDate(this.todayDate.getDate());
          }
        }
      });
    }

    setAllBetsDates(i){
      console.log(this.betValues);
      for (var x of this.betValues) {
          x.Date = this.allDatesDate;
      }
      console.log(this.betValues);
    }
  
    removevalue(i){
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title: 'Eliminar apuesta',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.betValues.splice(i,1);
        }
        Swal.close();
      })
    }


    addvalue(){
      var newBetDate = "";
      if(this.allDates == 'false'){
        newBetDate = this.allDatesDate;
      }
      this.betValues.push(
        {
          Number: "",
          Bet: "",
          Date: newBetDate
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
    if (betForm.invalid || isEmptyObject(this.betValues) ) { return; }
    this.confirmBets();
  }



  confirmBets(){
    var table = "";
    var total = 0;
    for (var x of this.betValues) {
      var res = x.Date.toString().split(' ');
      var dateString = res[2]+"/"+this.monthToNumber(res[1])+"/"+res[3];
      table += `<tr>
                      <td>${x.Number}</td>
                      <td>$${x.Bet}</td>
                      <td>${dateString}</td>
                  </tr>`;
      total = total + x.Bet;       
      }

    table = `<table border=1 width="100%"> 
      <tr>
        <th>Número</th>
        <th>Apuesta</th>
        <th>Fecha</th>
      </tr>
       ${table}
      <tr style="font-weight: bold;">
        <td></td>
        <td>TOTAL:</td>
        <td>$${total}</td>
      </tr>
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
       this.postValidateBetsAmount();
      } 
    });
  }



  postValidateBetsAmount(){
    var localBets = "";
    for (var x of this.betValues) {
      var res = x.Date.toString().split(' ');
      var dateString = res[2]+"/"+this.monthToNumber(res[1])+"/"+res[3];
      localBets += `${x.Number}:${x.Bet}:${dateString},`;
    }
    this.bet.BetsString = localBets;
    Swal.fire({
      allowOutsideClick: false,
      text: 'Verificando disponibilidad de apuesta, espere por favor...',
      icon: 'info'
      });
    Swal.showLoading();
    this.betService.postValidateBetsAmount(this.bet).subscribe( resp =>{
      if(resp.statusID == 200){
          Swal.close();
          if(this.bet.ID_Client == -1){
            this.postClient();
          }else{
            this.postBet();
          }
      }else{
        Swal.fire({
          allowOutsideClick: false,
          title: 'No se genero ninguna apuesta.',
          html: resp.statusDescription,
          icon: 'error',
          confirmButtonText: `Ok`
        }).then((result) => {
          Swal.close();
          return;
        })
      }
    });
  }
 


  postBet(){
    var localBets = "";
    for (var x of this.betValues) {
      var res = x.Date.toString().split(' ');
      var dateString = res[2]+"/"+this.monthToNumber(res[1])+"/"+res[3];
      localBets += `${x.Number}:${x.Bet}:${dateString},`;
    }
    this.bet.BetsString = localBets;
    console.log(this.bet.BetsString);
    Swal.fire({
    allowOutsideClick: false,
    text: 'Creando apuesta, espere por favor...',
    icon: 'info'
    });
    Swal.showLoading();
    this.betService.postBet(this.bet).subscribe( resp =>{
      console.log(resp);
      if(resp.statusID == 200){
        Swal.fire({
          allowOutsideClick: false,
          text: resp.statusDescription,
          icon: 'success',
          confirmButtonText: `Ok`
        }).then((result) => {
          Swal.close();
          this.dialogRef.close(resp);
        })
      }else{
        Swal.fire({
          allowOutsideClick: false,
          text: resp.statusDescription,
          icon: 'error',
          confirmButtonText: `Ok`
        }).then((result) => {
          Swal.close();
          this.getClients();
        })
      }
    });
  }



  postClient(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Creando cliente, espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();

    this.clientService.postClient(this.client).subscribe( resp =>{
      if(resp.statusID == 200){
        this.bet.ID_Client = resp.data[0].ID_Client; 
        this.postBet();
      }else{
        Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
        });
      }
    });
  }

  monthToNumber(month){
    switch(month) {
      case "Jan":
        return "01";
        break;
      case "Feb":
        return "02";
        break;
      case "Mar":
        return "03";
        break;
      case "Apr":
        return "04";
        break;
      case "May":
        return "05";
        break;
      case "Jun":
        return "06";
        break;
      case "Jul":
        return "07";
        break;
      case "Aug":
        return "08";
        break;
      case "Sep":
        return "09";
        break;
      case "Oct":
        return "10";
        break;
      case "Nov":
        return "11";
        break;
      case "Dec":
        return "12";
        break;
      default:
    }
  }

}
