import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import  Swal  from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UserModel } from 'app/models/users.model';
import { UserService } from 'app/services/user.service';

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

/*
  openClientDialog(action:string) {

    let ID_Client = this.client.ID_Client;
    let ID_User = this.client.ID_User;
    let Name = this.client.Name;
    let LastName = this.client.LastName;
    let Email = this.client.Email;
    let Phone = this.client.Phone;
    let Notes = this.client.Notes;

    let client = this.client;

    if(action == "create"){
      this.client  = new ClientModel();
    }
    let DialogWidth = "100%";
    if ($(window).width() > 991) { // Computer
       DialogWidth = "50%";
    }

    const dialogRef = this.dialog.open(ClientsDialogComponent, {
      width: DialogWidth,
      data:  this.client
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('---Printing Client respose---');
      console.log(this.client);
      if(this.client.ID_Client > 0){
        console.log('--- Refresh ---');
        this.getClients();
      }

      
      this.client.ID_Client = ID_Client;
      this.client.ID_User = ID_User;
      this.client.Name = Name;
      this.client.LastName = LastName;
      this.client.Email = Email;
      this.client.Phone = Phone;
      this.client.Notes = Notes;

      this.client  = new ClientModel();
    });
  }

  editClient(element){
    this.client = element;
    this.openClientDialog('edit');
  }


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

