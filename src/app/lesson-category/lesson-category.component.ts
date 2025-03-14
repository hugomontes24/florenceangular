import { Component, OnDestroy, OnInit } from '@angular/core';
import { LessonCategory } from './lesson-category.interface';
import { HttpService } from '../services/http.service';
import { HomeNavComponent } from '../core/home-nav/home-nav.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-category',
  standalone: true,
  imports: [CommonModule,
    HomeNavComponent, 
  ],
  templateUrl: './lesson-category.component.html',
  styleUrl: './lesson-category.component.scss'
})

export class LessonCategoryComponent implements OnInit, OnDestroy{
  subscription!: Subscription;
  lessonsCategories: LessonCategory[] = []

  lessonCategory: LessonCategory = {id: -1, name: '', description: ''} ;

  constructor(private httpService: HttpService) {}  

  ngOnInit():void {
    this.subscription = this.getLessonsCategories();
    // this.subscription = this.httpService.getCategories()
    // .subscribe(
    //   data => {
    //     this.lessonsCategories = data
    //   }
    // );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLessonsCategories = ()=>{
    return this.httpService.getCategories()
    .subscribe(
      data=>{
        this.lessonsCategories = data
      }
    )
  }







}





// getAllLessonsCategories = ():void => {
//   this.httpService.getAllLessonsCategories().subscribe({
//     next: (data:LessonCategory[]) => {
//       this.lessonsCategories = data;
//       // this.lessonsCategories.forEach(cat =>{ 
//       //   this.categoryMap[cat.id] = cat.name;
//       // });
//       // console.log(this.lessonsCategories);       
//     },
//     error: (err: Error) => console.error('Observer got an error: ' + err),
//     complete: () => console.log('Successfully fetched all users')
//   });
//}
