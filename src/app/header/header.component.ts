import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
public clickerMenu = false;
public menuL = false;


hamButton(){
  this.clickerMenu = !this.clickerMenu;
}

menu(){
  this.menuL = !this.menuL;
}
}
