import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DashModel } from 'app/models/dashboard.model';
import { AdminService } from 'app/services/admin.service';
import  Swal  from 'sweetalert2';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { BetsService } from 'app/services/bets.service';
import { BetModel } from 'app/models/bets.model';
import { ConfigModel } from 'app/models/config.model';
import { BetsWinnerModel } from 'app/models/betsWinners.model';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  dash = new DashModel();
  config = new ConfigModel ();

  betsWinner:BetsWinnerModel;
  displayedColumns: string[] = ['ID_Bet', 'UserFullName',  'ClientFullName', 'ID_Group',  'Number', 'Bet', 'Date', 'Created'];
  dataSource:any;


  displayedColumns2: string[] = ['ID_Bet',  'WinnerNumber',  'UserFullName', 'ClientFullName', 'ID_Group',  'Number', 'Bet', 'Date', 'Created'];
  dataSource2:any;


  constructor(
    private adminService:AdminService,
    private betsService: BetsService,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.dash  = new DashModel();
    this.betsWinner  = new BetsWinnerModel();
    this.getDashboard();
    this.getConfig();
    this.getAdminBets();

    this.getAdminBetsWinners();
  }

  getDashboard(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getDashboard().subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.dash = resp.data[0];
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
  }
  getConfig(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getConfig().subscribe( resp =>{
      console.log(resp);
      if(resp.statusID == 200){
        Swal.close();
        this.config = resp.data[0];
        console.log(resp.data);
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAdminBets(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getAdminBets().subscribe( resp =>{
      console.log(resp);
      if(resp.statusID == 200){
        Swal.close();
        this.dataSource = new MatTableDataSource<BetModel>(resp.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(resp.data);
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

    this.adminService.updateConfig(this.config).subscribe( resp =>{
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



  onSubmitBetWinerForm(betWinerForm:NgForm){
    if (betWinerForm.invalid) { return; }
    console.log(betWinerForm);

    var BetWinerDateFormated = this.betsWinner.Date.toString().split(' ');
    var dateString = BetWinerDateFormated[2]+"/"+this.monthToNumber(BetWinerDateFormated[1])+"/"+BetWinerDateFormated[3];

    Swal.fire({
      icon: 'warning',
      title: 'Asegurese de que el número: '+ this.betsWinner.Number +' y la fecha: '+ dateString +' sean los correctos, una vez  enviado a los vendedores no se podra modificar',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#9e9e9e',
      confirmButtonText: `Enviar número ganador`,
      confirmButtonColor: '#f44336',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.postBetsWinner();
      } 
    });


  }

  postBetsWinner(){
    var BetWinerDateFormated = this.betsWinner.Date.toString().split(' ');
    var dateString = BetWinerDateFormated[2]+"/"+this.monthToNumber(BetWinerDateFormated[1])+"/"+BetWinerDateFormated[3];
    this.betsWinner.Date = dateString;
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.postBetsWinner(this.betsWinner).subscribe( resp =>{
      console.log(resp);
      if(resp.statusID == 200){ Swal.fire({
        allowOutsideClick: false,
        text: resp.statusDescription,
        icon: 'success',
        confirmButtonText: `Ok`
      }).then((result) => {
        this.getAdminBetsWinners();
        this.betsWinner  = new BetsWinnerModel();
        Swal.close();
      })
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
    
  }




  applyBetsWinnersFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();
  }
  getAdminBetsWinners(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getAdminBetsWinners().subscribe( resp =>{
      console.log(resp);
      if(resp.statusID == 200){
        Swal.close();
        this.dataSource2 = new MatTableDataSource<BetModel>(resp.data);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort;
        console.log(resp.data);
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
