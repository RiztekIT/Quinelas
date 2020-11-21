import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import  Swal  from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'app/models/users.model';
import { UserService } from 'app/services/user.service';
import { UsersDialogComponent } from '../users-dialog/users-dialog.component';

declare const $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  user = new UserModel();

  displayedColumns: string[] = ['ID_User', 'FullName', 'Phone', 'Email', 'Actions'];
  dataSource:any;

  constructor(private userService: UserService,
              public dialog: MatDialog) { }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.getClients();
  }

  getClients(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.userService.getUsers().subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.dataSource = new MatTableDataSource<UserModel>(resp.data);
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


  openUserDialog(action:string) {


    let ID_User = this.user.ID_User;
    let Name = this.user.Name;
    let LastName = this.user.LastName;
    let Address = this.user.Address;
    let AddressZipCode = this.user.AddressZipCode;
    let AddressState = this.user.AddressState;
    let AddressCity = this.user.AddressCity;
    let AboutMe = this.user.AboutMe;
    let Phone = this.user.Phone;
    let Type = this.user.Type;
    let Email = this.user.Email;
    let Password = this.user.Password;

    if(action == "create"){
      this.user  = new UserModel();
    }
    let DialogWidth = "100%";
    if ($(window).width() > 991) { // Computer
       DialogWidth = "50%";
    }

    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: DialogWidth,
      data:  this.user
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('---Printing Client respose---');
      console.log(this.user);
      if(this.user.ID_User > 0){
        console.log('--- Refresh ---');
        this.getClients();
      }


      

      
      this.user.ID_User = ID_User;
      this.user.Name = Name;
      this.user.LastName = LastName;
      this.user.Address = Address;
      this.user.AddressZipCode = AddressZipCode;
      this.user.AddressState = AddressState;
      this.user.AddressCity = AddressCity;
      this.user.AboutMe = AboutMe;
      this.user.Phone = Phone;
      this.user.Type = Type;
      this.user.Email = Email;
      this.user.Password = Password;
  

      this.user  = new UserModel();
    });
  }

  editUser(element){
    this.user = element;
    this.openUserDialog('edit');
  }

/*
  deleteClient(ID_Client:number){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.clientService.deleteClient(ID_Client).subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        console.log('--- Refresh ---');
        this.getClients();
      }else{
        Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
        });
      }
    });
  }



  deleteClientAlert(element){
    this.client = element;
    Swal.fire({
      icon: 'warning',
      title: 'Seguro que desea eliminar este cliente: '+ element.Name+ ' ' +element.LastName+' (' +  element.ID_Client+ ') ?',
      showDenyButton: true,
      denyButtonText: `Cancelar`,
      denyButtonColor: '#9e9e9e',
      confirmButtonText: `Eliminar`,
      confirmButtonColor: '#f44336',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient(element.ID_Client);
      } 
    });
  }*/



}

