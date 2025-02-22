import { Component, EventEmitter, Output } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
// import { faPlus, faStar, faUserPen,faXmark} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button-modify',
  standalone: true,
  imports: [FaIconComponent],
  templateUrl: './button-modify.component.html',
  styleUrl: './button-modify.component.scss'
})
export class ButtonModifyComponent {
  @Output() buttonClicked = new EventEmitter<void>();

  onClick = () => {
    this.buttonClicked.emit();
  }

   

}
