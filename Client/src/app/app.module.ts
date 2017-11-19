import { SharedModule } from './shared/shared.module';
import { SignupComponent } from './routes/signup/signup.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { MyTimeComponent } from './routes/my-time/my-time.component';
import { EditMyTimeComponent } from './routes/edit-my-time/edit-my-time.component';
import { AddMyTimeComponent } from './routes/add-my-time/add-my-time.component';
import { ManagerClaimsService } from './shared/services/manager-claims.service';
import { TokenExpiryService } from './shared/services/token-expiry.service';
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
    UsersComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    SharedModule,
  ],
  providers: [
    AuthService,
    SnackBarService,
    TimingsService,
    TokenExpiryService,
    SelectedUserService,
    GlobalValidatorsService,
    ManagerClaimsService,
    DataService,
    AdminClaimsService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
