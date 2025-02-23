import { Component } from '@angular/core';
import { Lesson } from '../lesson/lesson.interface';
import { LessonGetDTO } from '../lesson/lesson-getDTO.interface';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [],
  templateUrl: './lesson-item.component.html',
  styleUrl: './lesson-item.component.scss'
})
export class LessonItemComponent {

  lesson : LessonGetDTO = {
    id: 0,
    duration: 0,
    date: new Date(),
    price: 0,
    nbMaxUsers: 0,
    idCategory: 0
  };

  constructor(private httpService: HttpService, private route: ActivatedRoute){}

  ngOnInit():void{
    this.lesson.id = this.getId(this.route.snapshot.paramMap.get('id'));

    this.getLessonById(this.lesson.id);
  }


  getLessonById = (id: number) => {
    this.httpService.getLessonById(id).subscribe({
      next: (data:any) => {
        this.lesson = data;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    })
    console.log(id);
    
  }


  // UTILS

  getId(id: string | any): number {
    return parseInt(id) ?? -1;
  }

}
