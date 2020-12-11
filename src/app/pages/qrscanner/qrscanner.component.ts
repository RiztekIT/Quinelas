import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.component.html',
  styleUrls: ['./qrscanner.component.css']
})
export class QrscannerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<QrscannerComponent>) { }

  qrleido

  ngOnInit(): void {
  }

  escaner(evento){
    console.log(evento);
    this.qrleido = evento;
    this.dialogRef.close(this.qrleido)
    
    // this.enableScan = false;
  }

}
