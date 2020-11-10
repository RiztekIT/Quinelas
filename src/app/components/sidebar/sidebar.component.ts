import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    //{ path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Inicio',  icon:'bubble_chart', class: '' },
    { path: '/clients', title: 'Clientes',  icon:'people_alt', class: '' },
    { path: '/new-bet', title: 'Nueva Apuesta',  icon:'request_quote', class: '' },
    { path: '/users', title: 'Usuarios',  icon:'group', class: '' },
    { path: '/config', title: 'Configuración',  icon:'settings', class: '' },
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

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
