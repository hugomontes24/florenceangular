import { Component, OnDestroy, OnInit } from '@angular/core';
import { LessonGetDTO } from '../lesson/lesson-getDTO.interface';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { LessonCategory } from '../lesson-category/lesson-category.interface';
import { CommonModule } from '@angular/common';
import { LessonMapper } from '../mappers/lesson.mapper';
import { UserGetDTO } from '../user/user-getDTO.interface';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { DialogDeleteComponent } from '../core/dialog/dialog-delete/dialog-delete.component';
import { ConfirmationComponent } from '../core/dialog/confirmation/confirmation.component';
import { faChevronDown, faChevronUp, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { HomeNavComponent } from "../core/nav/home-nav/home-nav.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lesson-item',
  standalone: true,
  imports: [
    CommonModule, FontAwesomeModule, FaIconComponent,
    FormsModule, MatButtonModule, MatTooltip,
    HomeNavComponent
],
  templateUrl: './lesson-item.component.html',
  styleUrl: './lesson-item.component.scss',
})

export class LessonItemComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  lessonsCategories: LessonCategory[] = [];
  categoryMap : {[idCategory:number]: string} = {};
  placesList: any;

  user: UserGetDTO = {
      id: null,
      name: '',
      email: '',
      age: 0,
      isValid: false,
      reservationId: null
    }

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

  constructor(private httpService: HttpService, private route: ActivatedRoute,
    private lessonMapper:LessonMapper, private dialog: MatDialog
  ){}

  ngOnInit():void{
    this.lesson.id = this.getId(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.httpService.getCategories()
    .subscribe(
      data => {
        this.lessonsCategories = data
        this.lessonsCategories.forEach(cat =>{ 
          this.categoryMap[cat.id] = cat.name;
        });
      }
    );
    this.getLessonById(this.lesson.id);
  }
  ngOnDestroy(): void {this.subscription.unsubscribe();}

  getAllLessonsCategories = ():void => {
    this.httpService.getAllLessonsCategories().subscribe({
      next: (data:LessonCategory[]) => {
          this.lessonsCategories = data;
          this.lessonsCategories.forEach(cat =>{ 
          this.categoryMap[cat.id] = cat.name;
        });
        // console.log(this.lessonsCategories);       
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      // complete: ()=>this.router.navigate(['listCategory'])
      complete: () => console.log('Successfully fetched all users')
    });
  }

  isVisible: boolean = true; // TODO turn to false
  toggleAccordion = () => {
    this.isVisible = !this.isVisible;
  }

  isFormReserve : boolean = false ;
  onReserveUser(i: number) {
    this.isFormReserve=true;
  }
 
  onSubmitReservation() {
    this.httpService.lessonReservation(this.user, this.lesson.id).subscribe({
      next: (data:UserGetDTO) => {
        const newUser = data;
        let index = this.placesList.indexOf(null);
        this.placesList[index] = newUser;
        const dialogRef = this.dialog.open(ConfirmationComponent);  
        // TODO this.isFormReserve = false;
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    })
  }
  
  onWithdrawUser(i: number) {  // desincrire un user de la lesson delete dans lesson-user
    const dialogRef1 = this.dialog.open(DialogDeleteComponent);

    dialogRef1.afterClosed().subscribe((dialogResult : boolean)=>{
      if(dialogResult){
            this.httpService.lessonDeleteReservation(this.placesList[i].id, this.lesson.id).subscribe({ 
          next: () => {this.placesList[i] = null;},
          error: (err: Error) => console.error('Observer got an error: ' + err),
          complete: () => console.log('Suppression réussiee')
        });
        
      }
    });
  }

  getLessonById = (id: number) => {
    this.httpService.getLessonById(id).subscribe({
      next: (data:any) => {
        this.lesson = this.lessonMapper.dataToGetDTO(data);
        ;
        
       
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Observer got a complete notification')
    })
  }

  // UTILS

  getId = (id: string | any): number => {
    return parseInt(id) ?? -1;
  }

  refreshPlacesList = (newUser: UserGetDTO) => {
    this.placesList.add(newUser);
  }

  faChevronDown = faChevronDown;
  faChevronUp= faChevronUp;
  faX = faXmarkCircle;
}


