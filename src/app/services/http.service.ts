import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user/user.interface';



@Injectable({
    providedIn: 'root'
  })

  export class HttpService {
   
    
    
    constructor( private http: HttpClient ) {  }
    
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
