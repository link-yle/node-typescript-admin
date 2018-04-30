import { AuthenticatedNavbarComponent } from './components/layout/authenticated-navbar/authenticated-navbar.component';
import { RouterModule } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { TimingsComponent } from './components/timings/view-time/timings.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { LoginLayoutComponent } from './components/layout/login-layout/login-layout.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgProgressModule } from 'ngx-progressbar';
import { TimeZoneFormComponent } from 'app/shared/components/timings/timezone-form/timezone-form.component';
import { AppInputsModule } from 'app/shared/components/ui-inputs/inputs.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    TypeaheadModule.forRoot(),
    HttpModule,
    RouterModule,
    MatSnackBarModule,
    NgProgressModule,
    BrowserAnimationsModule,
    AppInputsModule
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
    BrowserAnimationsModule,
    NgProgressModule,
    AppInputsModule,
    TypeaheadModule

  ],
  declarations: [
    NavComponent,
    FooterComponent,
    TimingsComponent,
    TimeZoneFormComponent,
    EditUserComponent,
    LoginLayoutComponent,
    AuthenticatedNavbarComponent,

  ],
})
export class SharedModule { }
