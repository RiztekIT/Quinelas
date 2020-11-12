import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { MatFormFieldModule } from '@angular/material/form-field';


import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule } from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
  

import {
  AgmCoreModule
} from '@agm/core';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { TypographyComponent } from './pages/typography/typography.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UpgradeComponent } from './pages/upgrade/upgrade.component';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsDialogComponent } from './pages/clients-dialog/clients-dialog.component';

@NgModule({

  exports: [
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatToolbarModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatToolbarModule,

    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    LoginComponent,
    TemplateComponent,
    ClientsComponent,
    ClientsDialogComponent
    

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
