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
import { QrscannerComponent } from '../qrscanner/qrscanner.component';
import { UserModel } from 'app/models/users.model';
import { Chart } from 'chart.js';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements AfterViewInit {

  user:UserModel;
  bet = new BetModel();

  displayedColumns: string[] = ['ID_Bet', 'ID_Group',  'ClientFullName', 'Number', 'Bet', 'Date', 'Created', 'Actions'];
  dataSource:any;

  constructor(private UserService: UserService,
    private betsService: BetsService,
    public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ngAfterViewInit() {
    this.getBets();
    this.getUserChart();
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
      width: DialogWidth,
      height: '450px'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('---Printing bet respose---');
      console.log(result);
      window.open('https://riztek.com.mx/php/Quinelas/bet_tickets.php?betsGroup='+result.IDGroup)

      this.getBets();
      this.getUserChart();
    });
  }

  openQRDialog(){
    let DialogWidth = "100%";
    if ($(window).width() > 991) { // Computer
       DialogWidth = "50%";
    }

    const dialogRef = this.dialog.open(QrscannerComponent, {
      width: DialogWidth,
      height: '450px'
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('Escaner', result);
      this.getBets();
      if (result){
        this.getWinner(result)
      }
    });


  }





  getUserChart(){
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
          if(this.user.AmountBets >= this.user.SalesGoal){
            var salesPendding = 0;
          }else{
            var salesPendding = this.user.SalesGoal - this.user.AmountBets;
          }
          Math.abs(salesPendding);
            var myDoughnutChart = new Chart("myChart", {
              type: 'doughnut',
              options: {
                tooltips: {
                  callbacks: {
                    label: function(tooltipItem, data) {
                      var dataset = data.datasets[tooltipItem.datasetIndex];
                      var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                      var total = meta.total;
                      var currentValue = dataset.data[tooltipItem.index];
                      var percentage = parseFloat((currentValue/total*100).toFixed(1));
                      return percentage + '%';
                    },
                    title: function(tooltipItem, data) {
                      return data.labels[tooltipItem[0].index];
                    }
                  }
                }
               
              },
              data: {
                datasets : [
                  {
                    backgroundColor: [ "#80c784", "#eee"],
                    data: [this.user.AmountBets,  salesPendding.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) ]
                  }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    `Ventas: $${this.user.AmountBets}`,
                    `Restante: $${salesPendding}`,
                ]
              }
              
            });
  
  
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });





  /*viewBetTicket(element:BetModel){
    return;
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
  }*/


  



}

getWinner(idgroup){
  
this.betsService.postpayBetTicket(idgroup).subscribe(data=>{
  console.log(data);

})

    
}

}
