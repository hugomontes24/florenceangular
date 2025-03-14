import { UserGetDTO } from "../user/user-getDTO.interface";

export interface LessonGetDTO {   
    id : number;
    duration : number; // in minutes
    date: Date | null;
    price: number;
    nbMaxUsers: number;
    placesUsersArray: any[];
    idCategory: number;
    users: UserGetDTO[];
    name: string|null;
    isVisible: boolean; // accordion open or close
}