import { Component, EventEmitter, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-button-delete',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './button-delete.component.html',
  styleUrl: './button-delete.component.scss'
})
export class ButtonDeleteComponent {
    @Output() buttonClickedDelete = new EventEmitter<void>();
  
    onClickDelete = () => {
      this.buttonClickedDelete.emit();
    }

}
