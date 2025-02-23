import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonItemComponent } from './lesson-item/lesson-item.component';


export const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'lessons', component: LessonComponent },
    { path:'lessons/:id', component: LessonItemComponent },
];
