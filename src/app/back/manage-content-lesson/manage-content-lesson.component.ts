import { Component, OnInit } from '@angular/core';
import { LessonCategory } from '../../lesson-category/lesson-category.interface';
import { LessonGetDTO } from '../../lesson/lesson-getDTO.interface';
import { UserGetDTO } from '../../user/user-getDTO.interface';
import { HttpService } from '../../services/http.service';
import { LessonMapper } from '../../mappers/lesson.mapper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-content-lesson',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-content-lesson.component.html',
  styleUrl: './manage-content-lesson.component.scss'
})
export class ManageContentLessonComponent implements OnInit {

  categories: LessonCategory[] = [];
  lessonCategory: LessonCategory = {
                                    id: 0,
                                    name: '',
                                    description: ''
                                  };

  lessons : LessonGetDTO[] = [];
  lesson : LessonGetDTO = {
                          id: 0,
                          duration: 0,
                          date: null,
                          price: 0,
                          nbMaxUsers: 0,
                          placesUsersArray: [],
                          idCategory: 0,
                          reservations: [],
                          // users: [],
                          name: '',
                          isVisible: false
                        };

  user: UserGetDTO = {
                      id: null,
                      name: '',
                      email: '',
                      age: 0,
                      isValid: false,
                      reservationId:null
                    }

  constructor(
    private httpService: HttpService,
    private lessonMapper: LessonMapper
  ) { }

  ngOnInit(): void {
    this.httpService.getCategories().subscribe(categories => {
      this.categories = categories;
      let foundCat = this.categories.find(cat => cat.id === this.lessonCategory.id) ; 
        if(foundCat){
          this.lessonCategory.name = foundCat.name;
          this.lessonCategory.description = foundCat.description;
        }
    });

    this.getAllLessonsByIdCategory(1);
    
  }

  getAllLessonsByIdCategory = (id: number):void => {
    this.httpService.getLessonsByIdCategory(id).subscribe({
      next: (data) => {
        this.lessons = this.lessonMapper.dataToGetDTOArray(data, this.categories);
        console.log(this.lessons);
        
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Successfully fetched all users')
    });
  }

}
