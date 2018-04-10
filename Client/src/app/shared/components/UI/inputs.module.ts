import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputLayoutComponent } from 'app/shared/components/UI/email-input-layout/email-input-layout.component';
import { NameInputLayoutComponent } from 'app/shared/components/UI/name-input-layout/name-input-layout.component';
import { SubmitButtonComponent } from 'app/shared/components/UI/submit-button/submit-button.component';
import { PasswordInputlayoutComponent } from 'app/shared/components/UI/password-input-layout/password-input-layout.component';

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
