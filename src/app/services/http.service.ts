import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../user/user.interface';
import { UserGetDTO } from '../user/user-getDTO.interface';
import { LessonGetDTO } from '../lesson/lesson-getDTO.interface';
import { LessonCategory } from '../lesson-category/lesson-category.interface';
import { LessonMapper } from '../mappers/lesson.mapper';
import { LessonDTO } from '../lesson/lessonDTO.interface';
@Injectable({
    providedIn: 'root'
  })

  export class HttpService {

  categories: LessonCategory[] = [];
  private itemsSubject = new Subject<any[]>();

    constructor( private http: HttpClient, private lessonMapper: LessonMapper ) {  }


  // lesson - category
  getLessonsByIdCategory = (id: number):Observable<LessonGetDTO[]> =>{
    return this.http.get<LessonGetDTO[]>(`http://localhost/florence/apiFlorence/lesson-categories/${id}/lessons`)  }

  getAllLessonsCategories= ():Observable<any> =>{ // todo implementer subject
    return this.http.get<any>(`http://localhost/florence/apiFlorence/lesson-categories`).pipe(
      tap(data =>  { 
        this.itemsSubject.next(data);
        this.categories = data; 
      })
    )
      
    // return this.http.get<LessonCategory[]>(`http://localhost/florence/apiFlorence/lesson-categories`);  
  }
  
  getCategories = ():Observable<any[]> => {
    return this.itemsSubject.asObservable();
  }

  updateCategories = () => {
    return this.itemsSubject.next(this.categories);
  }

  // lessons
  lessonReservation = (user: UserGetDTO, lessonId: number):Observable<any> => {
    return this.http.post<any>(`http://localhost/florence/apiFlorence/lessons/${lessonId}/reservations`, user );
  }

  lessonDeleteReservation = (userId: number, lessonId: number):Observable<any> => {
    return this.http.delete<any>(`http://localhost/florence/apiFlorence/lessons/${lessonId}/reservations/${userId}` );
  }
  

  getAllLessons = ():Observable<LessonGetDTO[]> =>{
    return this.http.get<LessonGetDTO[]>(`http://localhost/florence/apiFlorence/lessons`);
  }
  getAllLessonsByIdCategory = (id:number):Observable<LessonGetDTO[]> =>{
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

    getOne = (id: number) => {  
      return this.http.get<User>(`http://localhost/florence/apiFlorence/users/${id}`);
    }
    getOneByEmail = (email: string) : Observable<User> => {  
      return this.http.get<User>(`http://localhost/florence/apiFlorence/users/${email}`);
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
