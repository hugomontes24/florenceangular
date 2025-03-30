import { Component, Input, OnInit } from '@angular/core';
import { LessonCategory } from '../../lesson-category/lesson-category.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { ButtonModifyComponent } from "../../core/button-modify/button-modify.component";
import { ButtonDeleteComponent } from "../../core/button-delete/button-delete.component";

@Component({
  selector: 'app-manage-content',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonModifyComponent, ButtonDeleteComponent],
  templateUrl: './manage-content.component.html',
  styleUrl: './manage-content.component.scss'
})
export class ManageContentComponent implements OnInit{

  @Input() categories: LessonCategory[]= [];

  category: LessonCategory = {} as LessonCategory;

  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.refreshCat();
  }
  legend:string='';
  isFormEdit = false;
  onEditCat(categoryId: number): void {
    this.refreshCat();
    const selectedCategory = this.categories.find(category => category.id === categoryId);
    if (selectedCategory) {
      this.category = selectedCategory;
    }
    this.isFormEdit= true;
    this.legend = "Modification d'une catégorie"
  }

  onAddCat(){
    this.isFormEdit= true;
    this.legend = "Ajout d'une catégorie"
    this.refreshCat();
  }
  onSubmit(){ 
    if(this.category.id !== 0){
      this.httpService.updateCategory(this.category)
      .subscribe({
        next: (data:any) => {
          console.log("mise a jour reussie",data);
          const index = this.categories.findIndex(cat => cat.id === this.category.id);
          if (index !== -1) {
            Object.assign( this.categories[index] , this.category ); // change uniquement les proprietes sans changer la ref de l'objet
          }
        },
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => console.log('Successfully fetched all users')
      })
    } else {
      this.httpService.createCategory(this.category)
      .subscribe({
        next: (data:any) => {
          console.log(data);
          this.category.id = data.id;
          this.categories.push(this.category);
          this.refreshCat();
        },
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => console.log('Successfully added category')
      })
    }    
  }

  onDeleteCat(categoryId: number) {
    this.httpService.deleteCategory(categoryId)
    .subscribe({
      next: (data:any) => {
        console.log(data);
        this.categories = this.categories.filter(cat => cat.id !== categoryId);
      },
      error: (err: Error) => console.error('Observer got an error: ' + err),
      complete: () => console.log('Successfully deleted category')
    })
  }

  // UTILS
    
  refreshCat(){
    this.category = {
      id:0,
      name: '', 
      description: ''
    }
  }

}
