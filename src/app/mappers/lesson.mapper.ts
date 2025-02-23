import { Injectable } from "@angular/core";
import { LessonGetDTO } from "../lesson/lesson-getDTO.interface";
import { LessonDTO } from "../lesson/lessonDTO.interface";

@Injectable({
    providedIn:'root'
})

export class LessonMapper {
    dataToGetDTOArray = (data:any): LessonGetDTO[] => {
        let lessons:LessonGetDTO[] = data.map((item:any) => {
            if(item.date.date){
              const dateString = item.date.date;
              const dateObject = new Date(dateString);
              item.date = dateObject;
            }else{
                item.date = null
            }
            return item;
        });
        return lessons;
    }
    dataToGetDTO = (data:any): LessonGetDTO => {
        return data;
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