import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/user-profile', title: 'Inicio',  icon:'bubble_chart', class: '' },
    { path: '/clients', title: 'Clientes',  icon:'people_alt', class: '' },
    { path: '/bets', title: 'Apuestas',  icon:'request_quote', class: '' },
    { path: '/info', title: 'Información',  icon:'ballot', class: 'active-pro' },
];


export const ADMIN_ROUTES: RouteInfo[] = [
  //{ path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: '/user-profile', title: 'Inicio',  icon:'bubble_chart', class: '' },
  { path: '/clients', title: 'Clientes',  icon:'people_alt', class: '' },
  { path: '/bets', title: 'Apuestas',  icon:'request_quote', class: '' },
  { path: '/config', title: 'Configuración',  icon:'settings', class: 'admin-options' },
  { path: '/users', title: 'Usuarios',  icon:'group', class: '' },
  //{ path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
  { path: '/info', title: 'Información',  icon:'ballot', class: 'active-pro' },
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(
    private router: Router, 
    private userService: UserService ) { }

  ngOnInit() {
    if(this.userService.isAdmin()){
      this.menuItems = ADMIN_ROUTES.filter(menuItem => menuItem);
    }else{
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(){
    this.userService.logout();
  }

}
