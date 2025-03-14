import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FaIconComponent, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBars, faLeaf, faPersonPraying, faPersonWalkingDashedLineArrowRight } from '@fortawesome/free-solid-svg-icons';
import { NavMenuComponent } from "../nav-menu/nav-menu.component";
@Component({
  selector: 'app-home-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule, FaIconComponent, NavMenuComponent],
  templateUrl: './home-nav.component.html',
  styleUrl: './home-nav.component.scss'
})
export class HomeNavComponent {
  
  title: string = 'Slow Yoga';
  isShowMenu: boolean = false;
  
  
  toggleMenu = () =>{
    this.isShowMenu = !this.isShowMenu;
  }


  faLeaf = faLeaf;
  fabars = faBars;
  
}
