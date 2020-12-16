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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import {
  AgmCoreModule
} from '@agm/core';
import { TemplateComponent } from './pages/template/template.component';
import { LoginComponent } from './pages/login/login.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './pages/clients/clients.component';
import { ClientsDialogComponent } from './pages/clients-dialog/clients-dialog.component';
import { BetsComponent } from './pages/bets/bets.component';
import { BetsDialogComponent } from './pages/bets-dialog/bets-dialog.component';
import { SafeURLPipe } from './pipes/safe-url.pipe';
import { BetsDialogTicketComponent } from './pages/bets-dialog-ticket/bets-dialog-ticket.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersDialogComponent } from './pages/users-dialog/users-dialog.component';
import { ConfigComponent } from './pages/config/config.component';
import { InfoComponent } from './pages/info/info.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QrscannerComponent } from './pages/qrscanner/qrscanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

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
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,

    BrowserAnimationsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ZXingScannerModule
  ],
  declarations: [
    AppComponent,
    UserProfileComponent,
    LoginComponent,
    TemplateComponent,
    ClientsComponent,
    ClientsDialogComponent,
    BetsComponent,
    BetsDialogComponent,
    BetsDialogTicketComponent,
    SafeURLPipe,
    UsersComponent,
    UsersDialogComponent,
    ConfigComponent,
    InfoComponent,
    QrscannerComponent
    

  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
