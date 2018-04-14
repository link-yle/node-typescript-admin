import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailInputLayoutComponent } from 'app/shared/components/ui-inputs/email-input-layout/email-input-layout.component';
import { NameInputLayoutComponent } from 'app/shared/components/ui-inputs/name-input-layout/name-input-layout.component';
import { SubmitButtonComponent } from 'app/shared/components/ui-inputs/submit-button/submit-button.component';
import { PasswordInputlayoutComponent } from 'app/shared/components/ui-inputs/password-input-layout/password-input-layout.component';
import { DefaultInputLayoutComponent } from 'app/shared/components/ui-inputs/default-input-layout/default-input-layout.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    NameInputLayoutComponent,
    PasswordInputlayoutComponent,
    DefaultInputLayoutComponent
  ],
  declarations: [
    SubmitButtonComponent,
    EmailInputLayoutComponent,
    PasswordInputlayoutComponent,
    NameInputLayoutComponent,
    DefaultInputLayoutComponent
  ],
})
export class AppInputsModule { }
