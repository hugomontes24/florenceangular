import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user.interface';
import { LessonGetDTO } from '../lesson/lesson-getDTO.interface';
import { LessonCategory } from '../lesson/lesson-category.interface';
import { LessonMapper } from '../mappers/lesson.mapper';
import { LessonDTO } from '../lesson/lessonDTO.interface';



@Injectable({
    providedIn: 'root'
  })

  export class HttpService {
   
    constructor( private http: HttpClient, private lessonMapper: LessonMapper ) {  }

    getAllLessonsCategories= ():Observable<LessonCategory[]> =>{
      return this.http.get<LessonCategory[]>(`http://localhost/florence/apiFlorence/lesson-categories`);

    }

    getAllLessons = ():Observable<LessonGetDTO[]> =>{
      return this.http.get<LessonGetDTO[]>(`http://localhost/florence/apiFlorence/lessons`);
    }
    getLessonById= (id : number): Observable<LessonGetDTO> => {
      return this.http.get<LessonGetDTO>(`http://localhost/florence/apiFlorence/lessons/${id}`);
    }

    patchLesson = (lessonDTO: LessonDTO): Observable<any> => {

      return this.http.patch<any>(`http://localhost/florence/apiFlorence/lessons/${lessonDTO.id}`, lessonDTO);
    }

    

    getAll(): Observable<User[]> { // return Observable<User[]> type
      return this.http.get<User[]>(`http://localhost/florence/apiFlorence/users`);
    }
    
    update(editUser:User):Observable<any>{
      return this.http.patch<any>(`http://localhost/florence/apiFlorence/users/${editUser.id}`, editUser);
    }

    create = (editUser: User):Observable<any> => {
      return this.http.post<any>(`http://localhost/florence/apiFlorence/users/`, editUser);
    }

    delete = (userId: number):Observable<void> => {
      return this.http.delete<void>(`http://localhost/florence/apiFlorence/users/${userId}`);
    }



}
