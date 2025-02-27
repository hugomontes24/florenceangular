import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss'
})
export class DialogDeleteComponent {

  constructor(public dialogRef: MatDialogRef<DialogDeleteComponent>
  ) { }
  
  // close the dialog returns false
  onDismiss = () => { this.dialogRef.close(false); };

  // close the dialog returns true
  onConfirm = () => {
    this.dialogRef.close(true);
  };

}
