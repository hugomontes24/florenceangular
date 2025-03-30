import { Injectable } from "@angular/core";
import { LessonGetDTO } from "../lesson/lesson-getDTO.interface";
import { LessonDTO } from "../lesson/lessonDTO.interface";
import { LessonCategory } from "../lesson-category/lesson-category.interface";
import { UserGetDTO } from "../user/user-getDTO.interface";
import { UserMapper } from "./user.mapper";


@Injectable({
    providedIn:'root'
})

export class LessonMapper {
    categoryMap:{[idCategory:number]: string} = {};
    
    constructor( private userMapper: UserMapper){}

    dataToGetDTOArray = (data:any, categories:Array<LessonCategory>): LessonGetDTO[] => {
        const lessons:LessonGetDTO[] = data.map((item:any) => {  
            // categories.forEach((category:LessonCategory) => {
            //     if(item.idCategory === category.id){
            //         item.name = category.name;
            //     }
            // })

            const lesson = this.dataToGetDTO(item);

            return lesson;
        });
        return lessons;
    }

    dataToGetDTO = (data:any): LessonGetDTO => {
        const lessonGetDTO: LessonGetDTO = {
            id: data.id,
            duration: data.duration,
            date: null,
            price: data.price,
            nbMaxUsers: data.nbMaxUsers,
            placesUsersArray: [], 
            idCategory: data.idCategory,
            reservations: data.reservations,
            // users: data.users,
            name:'',
            isVisible: false
        }
        console.log("Données reçues du serveur  gpt:", data);

        
        if(data.date?.date){
            const dateObject = new Date(data.date.date);
            lessonGetDTO.date = dateObject;
        }
        if( data.nbMaxUsers > 0 ){
            // construit un array avec les users et les places vides (null)
            const tempArray = Array.from({length: data.nbMaxUsers}, (_, i) => null);
            lessonGetDTO.placesUsersArray = tempArray;

            Object.values(data.reservations).forEach((user: any, index) => {
                const userGet: UserGetDTO = this.userMapper.dataToUserGetDTO(user); 
                lessonGetDTO.placesUsersArray[index] = userGet;
            })
            //   lessonGetDTO.users.forEach((user: UserGetDTO, index: number) => {
            //     lessonGetDTO.placesUsersArray[index] = user;
            //   });
        }

        // console.log(Object.keys(lessonGetDTO.reservations ?? {}).length); correction gpt
        
        return lessonGetDTO;
    }

    getDTOtoDTO = (lessonGetDTO: LessonGetDTO): LessonDTO => {
        const lessonDTO: LessonDTO = {
            id: lessonGetDTO.id,
            duration: lessonGetDTO.duration,
            date: '',
            price: lessonGetDTO.price,
            nbMaxUsers: lessonGetDTO.nbMaxUsers,
            idCategory: lessonGetDTO.idCategory
        }
        if(lessonGetDTO.date != null){
            lessonDTO.date = this.dateToIsoStringLocale(lessonGetDTO.date);
          }
        return lessonDTO;
    }

    // UTILS
    // ** Convertit une date iso en locale
    private dateToIsoStringLocale = ( date:Date ):string => {
        const localDate = new Date( date.getTime() - date.getTimezoneOffset() * 60000 );
        return localDate.toISOString().slice(0,16);// convertit en 'YYYY-MM-DDTHH:mm'
      }

    dateLocaleToFormatDBLocale = (date:string, hour:string ):string => {
        return `${date} ${hour}:00`
    }

}