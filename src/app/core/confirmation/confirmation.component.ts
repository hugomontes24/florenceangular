import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [CommonModule, MatDialogModule,MatButtonModule ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss'
})

export class ConfirmationComponent {
  
  constructor(public dialogRef: MatDialogRef<ConfirmationComponent>) {}

  close = (): void => { this.dialogRef.close(); }
}
