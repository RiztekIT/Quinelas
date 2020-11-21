import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import  Swal  from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ClientsDialogComponent } from '../clients-dialog/clients-dialog.component';
import { BetsService } from 'app/services/bets.service';
import { BetModel } from 'app/models/bets.model';
import { BetsDialogComponent } from '../bets-dialog/bets-dialog.component';
import { BetsDialogTicketComponent } from '../bets-dialog-ticket/bets-dialog-ticket.component';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements AfterViewInit {

  bet = new BetModel();

  displayedColumns: string[] = ['ID_Bet', 'ClientFullName', 'Number', 'Bet', 'Created', 'Actions'];
  dataSource:any;

  constructor(private betsService: BetsService,
    public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.getBets();
  }

  getBets(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.betsService.getBets().subscribe( resp =>{
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




  openBetDialog() {

    let DialogWidth = "100%";
    if ($(window).width() > 991) { // Computer
       DialogWidth = "50%";
    }

    const dialogRef = this.dialog.open(BetsDialogComponent, {
      width: DialogWidth
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('---Printing bet respose---');
      this.getBets();
    });
  }


  viewBetTicket(element:BetModel){
    console.log(element.ID_Bet);


    const dialogRef = this.dialog.open(BetsDialogTicketComponent, {
      width: "750px",
      height: "430px",
      data: {
          ID_Bet: element.ID_Bet
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    });


  }



}
