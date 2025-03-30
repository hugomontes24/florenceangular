import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-v-tab',
  standalone: true,
  imports: [ ],
  templateUrl: './v-tab.component.html',
  styleUrl: './v-tab.component.scss'
})
export class VTabComponent {

  @Output() emitCategories: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitLessons: EventEmitter<void> = new EventEmitter<void>();


  handleCategories() {
    this.emitCategories.emit(true);
  }

  handleLessonsByCategory() {
    this.emitLessons.emit();
  }


}
