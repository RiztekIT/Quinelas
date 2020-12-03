import { Component, OnInit } from '@angular/core';
import { DashModel } from 'app/models/dashboard.model';
import { AdminService } from 'app/services/admin.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  dash = new DashModel();

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.dash  = new DashModel();
    this.getDashboard();
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



}