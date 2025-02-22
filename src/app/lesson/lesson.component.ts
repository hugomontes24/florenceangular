import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LessonCategory } from './lesson-category.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { LessonGetDTO } from './lesson-getDTO.interface';
import { ButtonModifyComponent } from "../core/button-modify/button-modify.component";
import { ButtonDeleteComponent } from '../core/button-delete/button-delete.component';
import { FormsModule } from '@angular/forms';
import { LessonDTO } from './lessonDTO.interface';
import { LessonMapper } from '../mappers/lesson.mapper';

@Component({
  selector: 'app-lesson',
  standalone: true,
  imports: [
    DatePipe, CommonModule,
    ButtonModifyComponent, ButtonDeleteComponent,
    FormsModule
],
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent {
  lessons: LessonGetDTO[] = [];
  lessonsCategories: LessonCategory[] = [];
  CategoryMap : {[idCategory:number]: string} = {};// mapping de lessonsCategories id_category=>nam
  editLesson: LessonDTO = {
                id: -1, 
                duration: 0, 
                date: '', 
                price: 0, 
                nbMaxUsers: 0,
                idCategory: -1
              }
                                //{id: -1, name: '', description: ''}};
  lessonCategory: LessonCategory = {id: -1, name: '', description: ''} ;

  constructor(
    private httpService: HttpService, private lessonMapper : LessonMapper
  ){}

  ngOnInit():void{
    this.getAllLessons();
    // this.getLessonById(2);
    this.getAllLessonsCategories();
  }

  getAllLessons=():void => {
    this.httpService.getAllLessons().subscribe({
      next: (data:any) => {
        this.lessons = data.map((item:any)=>{
          if(item.date.date){
            const dateString = item.date.date;
            const dateObject = new Date(dateString);
            item.date = dateObject;
          }else {
            item.date = null
          }
          return item;
        })
       // console.log(this.lessons);       
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
  }

  isShowForm : boolean = false ;
  formattedDate : string = '';
  inputDate : string = '';
  inputTime : string = '';
  onEditLesson(id: number) {
    const foundLesson = this.lessons.find(lesson => lesson.id == id)
    if(foundLesson != null){
      this.editLesson = this.lessonMapper.getDTOtoDTO(foundLesson);// convertit date en 'YYYY -MM-DDTHH:mmv     
      if(this.editLesson.date != ''){
        //this.formattedDate = this.dateToIsoStringLocale(this.editLesson.date);
        this.inputDate = this.editLesson.date.slice(0,10); // convertit en 'YYYY-MM-DD
        this.inputTime = this.editLesson.date.slice(11,16); // convertit en HH:mm      
      }
    }
    this.isShowForm = true ;
  }

  onSubmitLesson =():void =>{
    console.log(this.formattedDate);
    if(this.inputDate !== '' && this.inputTime !== '') {
      //this.formattedDate = `${this.inputDate}T${this.inputTime}`
      this.editLesson.date = this.lessonMapper.dateLocaleToFormatDBLocale(this.inputDate,this.inputTime);
    }
    
    this.httpService.patchLesson(this.editLesson).subscribe({
      next: (data:JSON)=>{
            this.getAllLessons();
            console.log(data); 
      }
    })
     
    }

  getLessonById = (id: number):void => {
    this.httpService.getLessonById(id).subscribe({
      next: (data) => {
        this.editLesson = data;
        
        if(data.date.date) {
          const dateString = data.date.date;
          const dateObject = new Date(dateString);
          // this.editLesson.date = dateObject;
        }

        this.lessonCategory = data.lessonCategory;
        
        if (this.editLesson.date !== null) {
          // this.editLesson.date = new Date(this.editLesson.date);
        }
        
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
  }

  getAllLessonsCategories = ():void => {
    this.httpService.getAllLessonsCategories().subscribe({
      next: (data:LessonCategory[]) => {
        this.lessonsCategories = data;
        this.lessonsCategories.forEach(cat =>{
          this.CategoryMap[cat.id] = cat.name;
        });
        // console.log(this.lessonsCategories);       
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
  }

  // dateToIsoStringLocale = ( date:Date ):string => {
  //   const localDate = new Date( date.getTime() - date.getTimezoneOffset() * 60000 );
  //   return localDate.toISOString().slice(0,16);// convertit en 'YYYY-MM-DDTHH:mm'
  // }

  isoStringToDate = (isoLocal: string): Date => {
    const date = new Date(isoLocal);
    return new Date(date.getTime() + date.getTimezoneOffset() * 60000);
  };

 

}
