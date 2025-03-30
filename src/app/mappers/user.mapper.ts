import { Injectable } from "@angular/core";
import { UserGetDTO } from "../user/user-getDTO.interface";

@Injectable({
    providedIn: 'root'
})
export class UserMapper {

    dataToUserGetDTO(data: any): UserGetDTO {
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            age: data.age,
            isValid: data.is_valid,
            reservationId: data.reservation_id
        }
    }

    
    
}