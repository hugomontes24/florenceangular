import { User } from "../user/user.interface";
import { LessonCategory } from "../lesson-category/lesson-category.interface";

export interface Lesson {   
    id : number;
    duration : number; // in minutes
    date: Date | null;
    price: number;
    nbMaxUsers: number;
    lessonCategory: LessonCategory;
    users: Array<User>[];

}