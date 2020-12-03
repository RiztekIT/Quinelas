import { Component, OnInit } from '@angular/core';
import { DashModel } from 'app/models/dashboard.model';
import { InfoModel } from 'app/models/info.model';
import { AdminService } from 'app/services/admin.service';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  info = new InfoModel();

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.info  = new InfoModel();
    this.getInfo();
  }

  getInfo(){
    Swal.fire({
      allowOutsideClick: false,
      text: 'Espere por favor...',
      icon: 'info'
    });
    Swal.showLoading();
    this.adminService.getInfo().subscribe( resp =>{
      if(resp.statusID == 200){
        Swal.close();
        this.info = resp.data[0];
      }else{
          Swal.fire({
            text: resp.statusDescription,
            icon: 'error'
          });
      }
    });
  }



}
