import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserGetDTO } from '../../user/user-getDTO.interface';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-reservation',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './dialog-reservation.component.html',
  styleUrl: './dialog-reservation.component.scss'
})
export class DialogReservationComponent {

  constructor(public dialogRef: MatDialogRef<DialogReservationComponent>,
            @Inject(MAT_DIALOG_DATA) public user: UserGetDTO,      
    ) { }
    
  // close the dialog returns false
  onDismiss = () => { this.dialogRef.close({success:false}); };

  // close the dialog returns true
  onConfirm = () => { 
    this.dialogRef.close({success:true, user: this.user}); 
  };

}
