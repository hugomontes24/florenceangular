import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonItemComponent } from './lesson-item/lesson-item.component';
import { LessonCategoryComponent } from './lesson-category/lesson-category.component';
import { LessonCategoryItemComponent } from './lesson-category-item/lesson-category-item.component';


export const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'lessonsCategories', component: LessonCategoryComponent },
    { path:'lessonsCategories/:id', component: LessonCategoryItemComponent },
    // { path:'lessonsCategories/:id/lessons', component: LessonComponent },

    
    { path:'lessons', component: LessonComponent },
    { path:'lessons/:id', component: LessonItemComponent },
];
