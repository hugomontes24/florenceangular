import { Component, OnInit } from '@angular/core';
import { HTabComponent } from "../h-tab/h-tab.component";
import { HomeNavComponent } from "../../core/nav/home-nav/home-nav.component";
import { VTabComponent } from "../v-tab/v-tab.component";
import { ManageContentComponent } from "../manage-content/manage-content.component";
import { CommonModule } from '@angular/common';
import { LessonCategory } from '../../lesson-category/lesson-category.interface';
import { HttpService } from '../../services/http.service';
import { ManageContentLessonComponent } from "../manage-content-lesson/manage-content-lesson.component";

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [CommonModule, HTabComponent, HomeNavComponent, VTabComponent, ManageContentComponent, ManageContentLessonComponent],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.scss'
})
export class ManageComponent implements OnInit {

  categories: LessonCategory[] = [];
  lessonCategory: LessonCategory = {
                                      id: 0,
                                      name: '',
                                      description: '' 
                                    };
  
  boolCategories:boolean = false;
  boolLessons: boolean = false;

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService.getCategories().subscribe(categories => {
      this.categories = categories; // todo do i need it ?
    }); 
    
  }

  onCategories(value:boolean){
    this.boolCategories = value;
    this.boolLessons = false;
  }

  onLessons(){
    this.boolLessons = true;
    console.log(this.boolLessons,' onlessons');
    this.boolCategories = false;
    
  }
}
