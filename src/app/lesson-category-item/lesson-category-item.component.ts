import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeNavComponent } from '../core/nav/home-nav/home-nav.component';
import { LessonCategory } from '../lesson-category/lesson-category.interface';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { LessonGetDTO } from '../lesson/lesson-getDTO.interface';
import { LessonMapper } from '../mappers/lesson.mapper';
import { CommonModule } from '@angular/common';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown, faChevronUp, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../core/dialog/dialog-delete/dialog-delete.component';
import { UserGetDTO } from '../user/user-getDTO.interface';
import { FormsModule } from '@angular/forms';
import { DialogReservationComponent } from '../core/dialog/dialog-reservation/dialog-reservation.component';
import { NotificationService } from '../services/notification.service';
import { NotificationComponent } from "../core/notification/notification.component";


@Component({
  selector: 'app-lesson-category-item',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FaIconComponent, FormsModule,
    HomeNavComponent, MatButtonModule, MatTooltip, NotificationComponent],
  templateUrl: './lesson-category-item.component.html',
  styleUrl: './lesson-category-item.component.scss'
})
export class LessonCategoryItemComponent implements OnInit{
 
  categories: LessonCategory[] = [];
  lessonCategory: LessonCategory = {
                                    id: 0,
                                    name: '',
                                    description: '' 
                                  };
  lessons: LessonGetDTO[] = [];
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
  constructor( private httpService: HttpService, private route:ActivatedRoute,
               private lessonMapper: LessonMapper, private dialog: MatDialog,
               private notificationService:NotificationService
              ){}
  ngOnInit(): void {
    this.httpService.getCategories().subscribe(categories => {
      this.categories = categories;
      let foundCat = this.categories.find(cat => cat.id === this.lessonCategory.id) ; 
        if(foundCat){
          this.lessonCategory.name = foundCat.name;
          this.lessonCategory.description = foundCat.description;
        }
    });
    this.route.params.subscribe(params => {
      let id = parseInt(params['id']);
      this.lessonCategory.id = id;
      
      this.getAllLessonsByIdCategory(id);
    
      let foundCat = this.categories.find(cat => cat.id === this.lessonCategory.id) ; 
        if(foundCat){
          this.lessonCategory.name = foundCat.name;
          this.lessonCategory.description = foundCat.description;  
        }
    })
  }
  
  getAllLessonsByIdCategory = (id: number):void => {
    this.httpService.getLessonsByIdCategory(id).subscribe({
      next: (data) => {
        this.lessons = this.lessonMapper.dataToGetDTOArray(data, this.categories);
        this.toggleAccordion(this.lessonId); 
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Successfully fetched all users')
    });
  }



  onCancelReservation(reservationId:number){
    const dialogRef1 = this.dialog.open(DialogDeleteComponent);
    dialogRef1.afterClosed().subscribe((dialogResult : any)=>{
      if(dialogResult){
            this.httpService.cancelReservation(reservationId).subscribe({ 
          next:() => {
            this.getAllLessonsByIdCategory(this.lessonCategory.id);
            this.notificationService.showMessage('Annulation effectuée', 3000);
            // this.toggleAccordion(this.lessonId);

          },
          error: (err: Error) => console.error('Observer got an error: ' + err),
          complete:() => console.log('Suppression réussiee')
        });
        
      }
    });
  }

  isFormReserve : boolean = false ;
  lessonId: number = 0;
  onReserveUser(lessonId: number) {
        this.isFormReserve=true;
        this.lessonId = lessonId;
        const dialogRef2 = this.dialog.open(DialogReservationComponent, {data:this.user});

        dialogRef2.afterClosed().subscribe((dialogResult : any)=>{
          if(dialogResult?.success){
            this.user = dialogResult.user;
            this.onSubmitReservation();    
          }
        });    
  } 

  onSubmitReservation(){
    this.httpService.lessonReservation(this.user, this.lessonId).subscribe({
        next: () => {
          this.getAllLessonsByIdCategory(this.lessonCategory.id);
          this.notificationService.showMessage('Réservation effectuée',3000);

          // this.toggleAccordion(this.lessonId);
      //   this.placesList[index] = newUser;
      //   const dialogRef = this.dialog.open(ConfirmationComponent);  
        // TODO this.isFormReserve = false;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    })
  }



  // UTILS
  
  toggleAccordion = (lessonId: number) => {
    const lesson = this.lessons.find(lesson => lesson.id === lessonId);
    if (lesson) {
      lesson.isVisible = !lesson.isVisible;
    }
  }

  getId = (id: string | any): number => {
    return parseInt(id) ?? -1;
  }



  faChevronDown = faChevronDown;
    faChevronUp= faChevronUp;
    faX = faXmarkCircle;

  /**
   * Desinscrit un utilisateur d'une lesson (supprime la ligne dans la table 
   * lesson-user). Ouvre une boite de dialogue pour demander confirmation.
   * @param userId l'ID de l'utilisateur  s'inscrire
   * @param lessonId l'ID de la le on  laquelle l'utilisateur s'inscrit
   */
  onWithdrawUser(userId: number, lessonId:number) {  // desincrire un user de la lesson delete dans lesson-user
    const dialogRef1 = this.dialog.open(DialogDeleteComponent);
    dialogRef1.afterClosed().subscribe((dialogResult : any)=>{
      if(dialogResult){
            this.httpService.lessonDeleteReservation(userId, lessonId).subscribe({ 
          next:() => {
            this.getAllLessonsByIdCategory(this.lessonCategory.id);
            this.notificationService.showMessage('Annulation effectuée', 3000);
            // this.toggleAccordion(this.lessonId);
          },
          error: (err: Error) => console.error('Observer got an error: ' + err),
          complete:() => console.log('Suppression réussiee')
        });
        
      }
    });
  }

}
