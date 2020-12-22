import { AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
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
import * as Chartist from 'chartist';
import { Chart } from 'chart.js';


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

  betsWinnersDateFilter:any;
  betsDateFilter:any;

  constructor(
    private adminService:AdminService,
    private betsService: BetsService,
    public dialog: MatDialog) { }

  


    @ViewChild('t1Sort') sort: MatSort;  // use two diff. sort for two table
    @ViewChild('t2Sort') sort2: MatSort;
  
    @ViewChild('t1Paginator') paginator: MatPaginator;
    @ViewChild('t2Paginator') paginator2: MatPaginator;



  ngOnInit(): void {
    this.dash  = new DashModel();
    this.betsWinner  = new BetsWinnerModel();
    this.getDashboard();
    this.getConfig();
    this.getAdminBets();
    this.getAdminBetsWinners();
    this.getAdminCharts();
  }


  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }

    let decimalPart = +value.toString().replace(/^[^\.]+/,'0');
    let mm = decimalPart * 60;
    var mmPart = mm.toString().length == 1 ? mm.toString() + "0" : mm.toString();

    if (value >= 0) {
      let valueStr = value.toFixed(2);
      let strArr = valueStr.split(".");
      if(strArr[0].length == 1) {
        strArr[0] = "0" + strArr[0];
      }
      var hhPart = strArr[0];
      //console.log(strArr);
    }

    return hhPart + ":" + mmPart;
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
      if(resp.statusID == 200){
        Swal.close();
        this.config = resp.data[0];
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
  getAdminBets(filterDate?){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getAdminBets(filterDate).subscribe( resp =>{
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





  onSubmit(profileForm:NgForm){
    if (profileForm.invalid) { return; }

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
  getAdminBetsWinners(filterDate?){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getAdminBetsWinners(filterDate).subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.dataSource2 = new MatTableDataSource<BetModel>(resp.data);
        this.dataSource2.paginator = this.paginator2;
        this.dataSource2.sort = this.sort2;
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
  }


  betsWinnersDateFilterTable(){
    var betsWinnersDateFilterFormated = "";
    if(this.betsWinnersDateFilter){
      betsWinnersDateFilterFormated = this.betsWinnersDateFilter.toString().split(' ');
      betsWinnersDateFilterFormated = betsWinnersDateFilterFormated[2]+"/"+this.monthToNumber(betsWinnersDateFilterFormated[1])+"/"+betsWinnersDateFilterFormated[3];
    }
    this.getAdminBetsWinners(betsWinnersDateFilterFormated);
  }

  betsDateFilterTable(){
    var betsDateFilterFormated = "";
    if(this.betsDateFilter){
      betsDateFilterFormated = this.betsDateFilter.toString().split(' ');
      betsDateFilterFormated = betsDateFilterFormated[2]+"/"+this.monthToNumber(betsDateFilterFormated[1])+"/"+betsDateFilterFormated[3];
    }
    this.getAdminBets(betsDateFilterFormated);
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



  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};

getAdminCharts(){



  Swal.fire({
    allowOutsideClick: false,
    text: 'Espere por favor...',
    icon: 'info'
  });
  Swal.showLoading();
  this.adminService.getAdminSalesGoals().subscribe( resp =>{
    console.log(resp);
    if(resp.statusID == 200){
      Swal.close();
      var employees = [];
      var sales = [];
      for(var i in resp.data) {
        employees.push(resp.data[i].FullName);
        sales.push(resp.data[i].AmountBets);
      }

      var chartdata = {
        labels: employees,
        datasets : [
          {

            label: 'Vendido este mes',
            backgroundColor: ["#e57372", "#80c784", "#ba67c8", "#63b5f6", "#dc6c5f", "#055aab", "#ffc107", "#cddc39", "#9e9e9e", "#2d3e4e"],
            data: sales
          },

        ]
      };
      var maxSales = Math.max.apply(Math, sales);
      var employeesSalesCurrentYear = new Chart("myChart", {
      type: 'bar',
      data: chartdata,
      options: {
      maintainAspectRatio: false,
      layout: {
      padding: {
      left: 10,
      right: 25,
      top: 25,
      bottom: 0
      }
      },
      scales: {
      xAxes: [{
      time: {
        unit: 'person'
      },
      gridLines: {
        display: false,
        drawBorder: false
      },
      ticks: {
        maxTicksLimit: 30
      },
      maxBarThickness: 50,
      }],
      yAxes: [{
      ticks: {
        min: 0,
        max: maxSales,
        maxTicksLimit: 5,
        padding: 10,
        // Include a dollar sign in the ticks
        callback: function(value, index, values) {
          return  value.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        }
      },
      gridLines: {
        color: "rgb(234, 236, 244)",
        zeroLineColor: "rgb(234, 236, 244)",
        drawBorder: false,
        borderDash: [2],
        zeroLineBorderDash: [2]
      }
      }],
      },
      legend: {
      display: false
      },
      tooltips: {
        callbacks: {
          label: function(tooltipItem, chart, data) {
              var values = chart.datasets[tooltipItem.datasetIndex].data;
                            var bigTotal = 0;
                            for (var i in values) {
                              bigTotal += values[i];
                          }

              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';

              function findObjectByKey(array, key, value) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i][key] === value) {
                        return array[i];
                    }
                }
                return null;
              }
              var obj = findObjectByKey(resp.data, "FullName", tooltipItem.xLabel);
              //console.log(obj.SalesGoal);
              var percentage = parseFloat((tooltipItem.yLabel/obj.SalesGoal*100).toFixed(1));
              return "$"+tooltipItem.yLabel.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) 
                        + 
                        ' de su objetivo de: $' 
                        + obj.SalesGoal.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})
                        + ' (' + percentage +'%)';
          }
        }
      },
      }
  });

  }else{
        Swal.fire({
          text: resp.statusDescription,
          icon: 'error'
        });
    }
  });

}

}
