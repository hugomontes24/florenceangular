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
import { environment } from '../../environments/environment';
@Injectable({
    providedIn: 'root'
  })

  export class HttpService { 
  
  categories: LessonCategory[] = [];
  private itemsSubject = new Subject<any[]>();

  private apiUrl :string | undefined;
  constructor( private http: HttpClient, private lessonMapper: LessonMapper ) {
    this.apiUrl = environment.apiUrl;
  }

  getAllLessonsCategories= ():Observable<any> =>{ // todo implementer subject
    console.log(this.apiUrl);
    
    return this.http.get<any>(`${this.apiUrl}/lesson-categories`).pipe(
      // return this.http.get<any>(`http://localhost/florence/apiFlorence/lesson-categories`).pipe(
      tap(data =>  { 
        this.itemsSubject.next(data);
        this.categories = data; 
      })
    )
  }

  // lesson - category
  updateCategory(category: LessonCategory) {
    return this.http.patch<any>(`${this.apiUrl}/lesson-categories/${category.id}`, category);
  }

  createCategory(category:LessonCategory):Observable<any>{ 
    return this.http.post<any>(`${this.apiUrl}/lesson-categories`, category);
  }

  deleteCategory(id: number): Observable<any> { 
    console.log(this.apiUrl);
    
    return this.http.delete<any>(`${this.apiUrl}/lesson-categories/${id}`);
  }

  
  getCategories = ():Observable<any[]> => {
    return this.itemsSubject.asObservable();
  }

  updateCategories = () => {
    return this.itemsSubject.next(this.categories);
  }


  getLessonsByIdCategory = (id: number):Observable<LessonGetDTO[]> =>{
    return this.http.get<LessonGetDTO[]>(`${this.apiUrl}/lesson-categories/${id}/lessons`)  }



  // lessons
  lessonReservation = (user: UserGetDTO, lessonId: number):Observable<any> => {
    return this.http.post<any>(`${this.apiUrl}/lessons/${lessonId}/reservations`, user );
  }
 

  lessonDeleteReservation = (userId: number, lessonId: number):Observable<any> => {
    return this.http.delete<any>(`${this.apiUrl}/lessons/${lessonId}/reservations/${userId}` );
  }
  

  getAllLessons = ():Observable<LessonGetDTO[]> =>{
    return this.http.get<LessonGetDTO[]>(`${this.apiUrl}/lessons`);
  }
  getAllLessonsByIdCategory = (id:number):Observable<LessonGetDTO[]> =>{
    return this.http.get<LessonGetDTO[]>(`${this.apiUrl}/lessons`);
  }
  getLessonById= (id : number): Observable<LessonGetDTO> => {
    return this.http.get<LessonGetDTO>(`${this.apiUrl}/lessons/${id}`);
  }

  patchLesson = (lessonDTO: LessonDTO): Observable<any> => {

    return this.http.patch<any>(`${this.apiUrl}/lessons/${lessonDTO.id}`, lessonDTO);
  }


  // lesson - user
  cancelReservation = (reservationId: number): Observable<any> => {
    return this.http.delete<any>(`${this.apiUrl}/lesson-users/${reservationId}`);
  }
    

    getAll(): Observable<User[]> { // return Observable<User[]> type
      return this.http.get<User[]>(`${this.apiUrl}/users`);
    }

    getOne = (id: number) => {  
      return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    }
    getOneByEmail = (email: string) : Observable<User> => {  
      return this.http.get<User>(`${this.apiUrl}/users/${email}`);
    }
    
    update(editUser:User):Observable<any>{
      return this.http.patch<any>(`${this.apiUrl}/users/${editUser.id}`, editUser);
    }

    create = (editUser: User):Observable<any> => {
      return this.http.post<any>(`${this.apiUrl}/users/`, editUser);
    }

    delete = (userId: number):Observable<void> => {
      return this.http.delete<void>(`${this.apiUrl}/users/${userId}`);
    }



}
