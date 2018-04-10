import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputLayoutComponent } from './email-input-layout/email-input-layout.component';
import { NameInputLayoutComponent } from './name-input-layout/name-input-layout.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { PasswordInputlayoutComponent } from './password-input-layout/password-input-layout.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    NameInputLayoutComponent,
    PasswordInputlayoutComponent,
  ],
  declarations: [
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    PasswordInputlayoutComponent,
    NameInputLayoutComponent
  ],
})
export class AppInputsModule { }
