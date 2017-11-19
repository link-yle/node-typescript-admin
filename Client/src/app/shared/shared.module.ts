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
import { MaterialModule } from '@angular/material';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavComponent } from './components/layout/nav/nav.component';
import { TimingsComponent } from './components/timings/view-time/timings.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    RouterModule
  ],
  providers: [],
  exports: [
    FooterComponent,
    NavComponent,
    MaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TimingsComponent,
    AddTimeComponent,
    EditimeComponent,
    TimeZoneFormComponent,
    EditUserComponent


  ],
  declarations: [
    NavComponent,
    FooterComponent,
    TimingsComponent,
    AddTimeComponent,
    EditimeComponent,
    TimeZoneFormComponent,
    EditUserComponent

  ],
})
export class SharedModule { }
