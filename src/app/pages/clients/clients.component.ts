import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ClientModel } from 'app/models/clients.model';
import { ClientService } from 'app/services/client.service';
import  Swal  from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ClientsDialogComponent } from '../clients-dialog/clients-dialog.component';

declare const $: any;

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements AfterViewInit {

  client = new ClientModel();

  displayedColumns: string[] = ['ID_Client', 'Name', 'Phone', 'Email', 'Actions'];
  dataSource:any;

  constructor(private clientService: ClientService,
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
    this.clientService.getClients().subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.dataSource = new MatTableDataSource<ClientModel>(resp.data);
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


  openClientDialog(action:string) {
    let local_ID_Client = this.client.ID_Client;
    if(action == "create"){
      local_ID_Client = 0;
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
      this.client.ID_Client = local_ID_Client;
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
  }



}

