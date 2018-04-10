import { SignupSuccessComponent } from './routes/signup/signup-success/signup-success.component';
import { LoginComponent } from './routes/personal/login/login.component';
import {
    NewPasswordAndRecoveryCodeSubmissionComponent,
// tslint:disable-next-line:max-line-length
} from './routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/new-password-and-recovery-code-submission.component';
import {
    ChangeMyPasswordUsingOldPasswordComponent,
} from './routes/personal/edit-my-info/change-my-password-using-old-password/change-my-password-using-old-password.component';
import { EmptyComponent } from './routes/empty/empty.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './routes/signup/signup.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { TimingsService } from './shared/services/timings.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from 'app/app-routing.module';
import { SnackBarService } from './shared/services/snackbar.service';
import { SelectedUserService } from './shared/services/selectedUser.service';
import { DataService } from './shared/services/data.service';
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { EditOtherUserInfoComponent } from './routes/edit-other-user-info/edit-other-user-info.component';
import { AddOtherUserTimeComponent } from './routes/add-other-user-time/add-other-user-time.component';
import { EditOtherUserTimeComponent } from './routes/edit-other-user-time/edit-other-user-time.component';
import { EditRoleComponent } from './routes/edit-role/edit-role.component';
import { UsersComponent } from './routes/users-list/users.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PublicInfoService } from './shared/services/public.info.service';
import { AddMyTimeComponent } from 'app/routes/personal/add-my-time/add-my-time.component';
import { EditMyTimeComponent } from 'app/routes/personal/edit-my-time/edit-my-time.component';
import { EditMyInfoComponent } from 'app/routes/personal/edit-my-info/edit-my-info.component';
import { MyTimeComponent } from 'app/routes/personal/my-time/my-time.component';
import { ChangeOtherUserPasswordComponent } from 'app/routes/change-other-user-password/change-other-user-password.component';
import { NewPasswordFormComponent } from 'app/shared/components/new-password-form/new-password-form.component';
import { CorruptLinkComponent } from 'app/routes/corrupt-link/corrupt-link.component';
import { RecoverPasswordByEmailComponent } from 'app/routes/personal/recover-password-by-email/recover-password-by-email.component.';
// tslint:disable-next-line:max-line-length
import { PasswordRecoveredSuccessfullyComponent } from 'app/routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/password-recovered-successfully/password-recovered-successfully.component';
import { ActivateAfterSignupComponent } from 'app/routes/signup/activate-after-signup/activate-after-signup.component';


@NgModule({
  declarations: [
    AppComponent,
    AddMyTimeComponent,
    AddOtherUserTimeComponent,
    EditMyInfoComponent,
    EditMyTimeComponent,
    EditOtherUserInfoComponent,
    EditMyTimeComponent,
    EditOtherUserInfoComponent,
    EditOtherUserTimeComponent,
    EditRoleComponent,
    LoginComponent,
    MyTimeComponent,
    OtherUserTimeComponent,
    SignupComponent,
    UsersComponent,
    EmptyComponent,
    SignupSuccessComponent,
    ActivateAfterSignupComponent,
    ChangeMyPasswordUsingOldPasswordComponent,
    ChangeOtherUserPasswordComponent,
    NewPasswordFormComponent,
    CorruptLinkComponent,
    RecoverPasswordByEmailComponent,
    NewPasswordAndRecoveryCodeSubmissionComponent,
    PasswordRecoveredSuccessfullyComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
    PaginationModule.forRoot(),
  ],
  providers: [
    AuthService,
    SnackBarService,
    TimingsService,
    SelectedUserService,
    DataService,
    AdminClaimsService,
    AuthGuardService,
    PublicInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
