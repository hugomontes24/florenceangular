import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule, Router } from '@angular/router';
import { LessonCategory } from '../../../lesson-category/lesson-category.interface';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatMenuModule, 
    MatIconModule, FontAwesomeModule,FaIconComponent,
    RouterModule, 
   ],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss', 
  encapsulation: ViewEncapsulation.None
})
export class NavMenuComponent implements OnInit {

  lessonsCategories: LessonCategory[] = [];

  constructor(
    private httpService: HttpService, 
    private router: Router
  ){}
  
  ngOnInit():void{
    this.getAllLessonsCategories();
  }
  
  getAllLessonsCategories = ():void => {
    this.httpService.getAllLessonsCategories()
    .subscribe({
      next: (data:LessonCategory[]) => {this.lessonsCategories = data;},
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Successfully fetched all categories')
    });
  }

  goToCategory(idCategory: number) {
    this.router.navigate(['/lessonsCategories', idCategory]);
  }

  fabars = faBars;
  

}
