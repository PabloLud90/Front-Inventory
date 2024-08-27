import { query } from '@angular/animations';
import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  mobileQuery: MediaQueryList;

  menuNav = [
    {name: "Home", router: "home", icon: "home"},
    {name: "Categorias", router: "home", icon: "category"},
    {name: "Productos", router: "home", icon: "production_quantity_limits"}

 
  ]

  constructor(media: MediaMatcher){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');

  }

}
