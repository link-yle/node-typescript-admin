import { AuthenticatedNavbarComponent } from './components/layout/authenticated-navbar/authenticated-navbar.component';
import { TimeZoneFormComponent } from './components/timings/write-time/shared/timezone-form/timezone-form.component';
import { EditimeComponent } from './components/timings/write-time/edit-time/edit-time.component';
import { AddTimeComponent } from './components/timings/write-time/add-time/add-time.component';
import { RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SnackBarService } from './services/snackbar.service';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { TimingsComponent } from './components/timings/view-time/timings.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { PaneledTableComponent } from './components/layout/paneled-table/paneled-table.component';
import { SubmitButtonComponent } from './components/UI/submit-button/submit-button.component';
import { EmailInputComponent } from './components/UI/email-input/email-input.component';
import { PasswordInputComponent } from './components/UI/password-input/password-input.component';
import { CustomInputComponent } from './components/UI/custom-input/custom-input.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    HttpModule,
    RouterModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  exports: [
    FooterComponent,
    NavComponent,
    LoginLayoutComponent,
    AuthenticatedNavbarComponent,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TimingsComponent,
    AddTimeComponent,
    EditimeComponent,
    TimeZoneFormComponent,
    EditUserComponent,
    PaneledTableComponent,
    SubmitButtonComponent,
    EmailInputComponent,
    PasswordInputComponent,
    CustomInputComponent,
    // MatSnackBarModule,
    BrowserAnimationsModule
  ],
  declarations: [
    NavComponent,
    FooterComponent,
    TimingsComponent,
    AddTimeComponent,
    EditimeComponent,
    TimeZoneFormComponent,
    EditUserComponent,
    LoginLayoutComponent,
    AuthenticatedNavbarComponent,
    PaneledTableComponent,
    SubmitButtonComponent,
    EmailInputComponent,
    PasswordInputComponent,
    CustomInputComponent

  ],
})
export class SharedModule { }
