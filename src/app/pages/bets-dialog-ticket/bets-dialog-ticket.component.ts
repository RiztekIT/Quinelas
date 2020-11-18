import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientModel } from 'app/models/clients.model'; 
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ClientService } from 'app/services/client.service';

import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-bets-dialog-ticket',
  templateUrl: './bets-dialog-ticket.component.html',
  styleUrls: ['./bets-dialog-ticket.component.css']
})
export class BetsDialogTicketComponent implements OnInit {
  ticketURL = "";
  constructor(
    public dialogRef: MatDialogRef<BetsDialogTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public bet,
    private clientService: ClientService) {
      this.ticketURL = "https://riztek.com.mx/php/Quinelas/bet_ticket.php?ID_Bet=" + bet.ID_Bet;
  }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }

}
