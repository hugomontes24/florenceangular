import { Component } from '@angular/core';
import { User } from '../user/user.interface';
import { HttpService } from '../services/http.service';
import { FooterComponent } from '../core/footer/footer.component';
import { NavComponent } from '../core/nav/nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  title!: string;
  description!: string;
  imgUrl!: string;
  date!: Date;
  users: User[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit():void{
    this.title='Bonjour';
    this.description='test';
    this.date=new Date();
    

    this.getAllUsers();


  }

  getAllUsers=()=>{
    this.httpService.getAll().subscribe({
      next: (data) => {
        console.log("hellooooo");
        this.users = data;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
    
  }

}
