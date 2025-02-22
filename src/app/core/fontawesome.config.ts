import { FaIconLibrary } from "@fortawesome/angular-fontawesome";   
import { faUser, faPlus, faPen, faPencil, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export function initFontAwesome(library: FaIconLibrary) {
    library.addIcons(faUser, faPlus, faPen, faPencil,
        faCircleXmark,

    );
}