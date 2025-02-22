export interface LessonGetDTO {   
    id : number;
    duration : number; // in minutes
    date: Date | null;
    price: number;
    nbMaxUsers: number;
    idCategory: number;
}