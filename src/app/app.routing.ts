import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { MapsComponent } from './pages/maps/maps.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { IconsComponent } from './pages/icons/icons.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { LoginComponent } from './pages/login/login.component';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SessionGuard } from './guards/session.guard';
import { ClientsComponent } from './pages/clients/clients.component';
import { BetsComponent } from './pages/bets/bets.component';
import { UsersComponent } from './pages/users/users.component';

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
    { path: 'users',   component: UsersComponent, canActivate:[ SessionGuard]},
    /*{ path: 'table-list',     component: TableListComponent },
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
