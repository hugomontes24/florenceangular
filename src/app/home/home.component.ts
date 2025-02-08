import { Component } from '@angular/core';
import { User } from '../user/user.interface';
import { HttpService } from '../services/http.service';
import { FooterComponent } from '../core/footer/footer.component';
import { NavComponent } from '../core/nav/nav.component';
import { CommonModule } from '@angular/common';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faStar, faUserPen,faXmark} from '@fortawesome/free-solid-svg-icons';
import { faGithub} from '@fortawesome/free-brands-svg-icons';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    NavComponent, CommonModule, FontAwesomeModule, FaIconComponent,
    FormsModule
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

  editUser : User={id:-1, name:'', age:0, is_valid:false};  
  isShowForm :boolean = false; 
  onEditUser(userId: number): void {
    this.editUser = this.users.find(user => user.id === userId) as User;
    this.isShowForm = true;
  }

  onAddUser=() => {
    this.editUser = {id:-1, name:'nouveau client', age:0, is_valid:false};
    this.isShowForm = true;
  }

  getAllUsers=() => {
    this.httpService.getAll().subscribe({
      next: (data:User[]) => {
        console.log("hellooooo");
        this.users = data;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
  }

  onSubmitUser() {
    console.log(this.editUser.id);
    if(this.editUser.id === -1){
      this.httpService.create(this.editUser).subscribe({
        next: (data:any) => {
          console.log(data);
          this.editUser.id = data.id;
          this.users.push(this.editUser);
        },
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => console.log('Successfully fetched all users')
      });
    } else {
      
        this.httpService.update(this.editUser).subscribe({
          next: (data:any) => {
            console.log(data);
            this.users.map(user => {
              user.id === this.editUser.id ? this.editUser : user;
              }
            );
          },
          error: (err: Error) => console.error('Observer got an error: ' + err),
          // complete: ()=>this.router.navigate(['listCategory'])
          complete: () => console.log('Successfully fetched all users')
        });
    }
  }

  onDeleteUser = (userId: number)=> {
    this.httpService.delete(userId).subscribe({
      next: () => {
       this.users = this.users.filter( user => user.id !== userId );
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully deleted user')
    });
    }


  faPlus = faPlus;
  faUser = faUserPen;
  faStar = faStar;
  faGithub = faGithub;
  faXmark = faXmark;



}
