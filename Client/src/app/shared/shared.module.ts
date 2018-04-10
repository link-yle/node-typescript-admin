import { AuthenticatedNavbarComponent } from './components/layout/authenticated-navbar/authenticated-navbar.component';
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
import { SubmitButtonComponent } from './components/UI/submit-button/submit-button.component';
import { PasswordInputComponent } from './components/UI/password-input/password-input.component';
import { CustomInputComponent } from './components/UI/custom-input/custom-input.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { TimeZoneFormComponent } from 'app/shared/components/timings/timezone-form/timezone-form.component';
import { EmailInputLayoutComponent } from 'app/shared/components/UI/email-input-layout/email-input-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    HttpModule,
    RouterModule,
    MatSnackBarModule,
    NgProgressModule.forRoot(),
    NgProgressHttpModule,
    BrowserAnimationsModule,
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
    TimeZoneFormComponent,
    EditUserComponent,
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    PasswordInputComponent,
    CustomInputComponent,
    // MatSnackBarModule,
    BrowserAnimationsModule,
    NgProgressModule

  ],
  declarations: [
    NavComponent,
    FooterComponent,
    TimingsComponent,
    TimeZoneFormComponent,
    EditUserComponent,
    LoginLayoutComponent,
    AuthenticatedNavbarComponent,
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    PasswordInputComponent,
    CustomInputComponent,


  ],
})
export class SharedModule { }
