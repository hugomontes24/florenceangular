import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';


@Component({
  selector: 'app-course',
  standalone: true,
  imports: [],
  templateUrl: './course.component.html',
  styleUrl: './course.component.scss'
})

export class CourseComponent {
  
  test: string =  'test h';

  constructor(
    private httpService: HttpService
  ){}


  ngOnInit(){
    // this.httpService.getData(  )
    // .subscribe({
    //     next: (data:JSON )=>console.log(data),
    //     error: (err: Error )=>console.error('Observer got an error: '+ err ),
    //     // complete: ()=>this.router.navigate(['listCategory'])
    //     // complete: ()=>console.log('Observer got a complete notification')
    //    });
  }


}
