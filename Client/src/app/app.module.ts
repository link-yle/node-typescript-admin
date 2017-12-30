import { EmptyComponent } from './routes/empty/empty.component';
import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './routes/signup/signup.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { MyTimeComponent } from './routes/my-time/my-time.component';
import { EditMyTimeComponent } from './routes/edit-my-time/edit-my-time.component';
import { AddMyTimeComponent } from './routes/add-my-time/add-my-time.component';
import { TimingsService } from './shared/services/timings.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './shared/services/auth.service';
import { AppRoutingModule } from 'app/app-routing.module';
import { SnackBarService } from './shared/services/snackbar.service';
import { SelectedUserService } from './shared/services/selectedUser.service';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from './shared/services/data.service';
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { EditMyInfoComponent } from './routes/edit-my-info/edit-my-info.component';
import { EditOtherUserInfoComponent } from './routes/edit-other-user-info/edit-other-user-info.component';
import { AddOtherUserTimeComponent } from './routes/add-other-user-time/add-other-user-time.component';
import { EditOtherUserTimeComponent } from './routes/edit-other-user-time/edit-other-user-time.component';
import { LoginComponent } from './routes/login/login.component';
import { EditRoleComponent } from './routes/edit-role/edit-role.component';
import { UsersComponent } from './routes/users-list/users.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PublicInfoService } from './shared/services/public.info.service';
import { ActivationLinkComponent } from './routes/activation-link/activation-link.component';
import { NormalSignupSuccessComponent } from 'app/routes/signup/normal-signup-success/normal-signup-success.component';
import { SecureSignupSuccessComponent } from 'app/routes/signup/secure-signup-success/secure-signup-success.component';
import { ForgottenPasswordFormComponent } from 'app/routes/forgotten-password-form/forgotten-password-form.component';
import { ForgottenPasswordFormSuccessComponent } from 'app/routes/forgotten-password-form/forgotten-password-form-success/forgotten-password-form-success.component';
import { ChangePasswordFormComponent } from 'app/routes/change-password-form/change-password-form.component';

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
    ActivationLinkComponent,
    ForgottenPasswordFormComponent,
    ForgottenPasswordFormSuccessComponent,
    NormalSignupSuccessComponent,
    SecureSignupSuccessComponent,
    ChangePasswordFormComponent
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
    GlobalValidatorsService,
    DataService,
    AdminClaimsService,
    AuthGuardService,
    PublicInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
