import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { SnackBarService } from './services/snackbar.service';
import { MaterialModule } from '@angular/material';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[ ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    FooterComponent,
    NavComponent,
    MaterialModule,

  ],
  declarations: [
    NavComponent,
    FooterComponent

  ],
})
export class SharedModule { }
