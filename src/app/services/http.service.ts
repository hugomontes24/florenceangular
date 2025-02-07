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
        
}
