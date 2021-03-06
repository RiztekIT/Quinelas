import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SessionGuard } from './guards/session.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { BetsComponent } from './pages/bets/bets.component';
import { UsersComponent } from './pages/users/users.component';
import { ConfigComponent } from './pages/config/config.component';
import { UserTypeGuard } from './guards/user-type.guard';
import { InfoComponent } from './pages/info/info.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: TemplateComponent,
    children: [{
      path: '',
      component: TemplateComponent
    }, 
    /*
    { path: 'dashboard',      component: DashboardComponent },*/
    { path: 'user-profile',   component: UserProfileComponent, canActivate:[ SessionGuard]},
    { path: 'clients',   component: ClientsComponent, canActivate:[ SessionGuard]},
    { path: 'bets',   component: BetsComponent, canActivate:[ SessionGuard]},
    { path: 'users',   component: UsersComponent, canActivate:[ SessionGuard, UserTypeGuard]},
    { path: 'config',     component: ConfigComponent, canActivate:[ SessionGuard, UserTypeGuard]},
    { path: 'info',   component: InfoComponent, canActivate:[ SessionGuard]},/*
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
  { path: 'upgrade',        component: UpgradeComponent }*/]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }



/*import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },{
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren:  './pages/admin-layout/admin-layout.module#AdminLayoutModule'
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }*/
