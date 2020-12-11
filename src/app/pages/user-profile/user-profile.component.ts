import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from 'app/models/users.model'; 
import { UserService } from 'app/services/user.service';
import  Swal  from 'sweetalert2';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BetModel } from 'app/models/bets.model';
import { BetsService } from 'app/services/bets.service';
import { BetsWinnerModel } from 'app/models/betsWinners.model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  user:UserModel;
  userID:number;


  displayedColumns: string[] = ['ID_Bet',  'WinnerNumber',  'UserFullName', 'ClientFullName', 'ID_Group',  'Number', 'Bet', 'Date', 'Created'];
  dataSource:any;

  constructor(
    private betsService:BetsService,private UserService: UserService,) {
   }

   @ViewChild(MatPaginator) paginator: MatPaginator;
   @ViewChild(MatSort) sort: MatSort;


  ngOnInit() {
    this.user = new UserModel();
    this.getUser();
    this.getBetsWinners();
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




  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getBetsWinners(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.betsService.getBetsWinners().subscribe( resp =>{
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





}
