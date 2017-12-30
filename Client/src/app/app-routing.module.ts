import {
    AuthenticatedNavbarComponent,
} from './shared/components/layout/authenticated-navbar/authenticated-navbar.component';
import { EditMyTimeComponent } from './routes/edit-my-time/edit-my-time.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { SignupComponent } from './routes/signup/signup.component';
import { EditMyInfoComponent } from './routes/edit-my-info/edit-my-info.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { LoginComponent } from './routes/login/login.component';
import { MyTimeComponent } from './routes/my-time/my-time.component';
import { UsersComponent } from './routes/users-list/users.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { EditRoleComponent } from './routes/edit-role/edit-role.component';
import { AddOtherUserTimeComponent } from './routes/add-other-user-time/add-other-user-time.component';
import { AddMyTimeComponent } from './routes/add-my-time/add-my-time.component';
import { EditUserComponent } from './shared/components/users/edit-user/edit-user.component';
import { EditOtherUserInfoComponent } from './routes/edit-other-user-info/edit-other-user-info.component';
import { EmptyComponent } from './routes/empty/empty.component';
import { LoginLayoutComponent } from './shared/components/layout/login-layout/login-layout.component';
import { EditOtherUserTimeComponent } from './routes/edit-other-user-time/edit-other-user-time.component';
// tslint:disable-next-line:max-line-length
import { ActivationLinkComponent } from './routes/activation-link/activation-link.component';
import { CorruptActivationLinkComponent } from './routes/corrupt-activation-link/corrupt-activation-link.component';
import { ForgottenPasswordComponent } from './routes/forgotten-password/forgotten-password.component';
import { SecureSignupSuccessComponent } from 'app/routes/signup/secure-signup-success/secure-signup-success.component';
import { NormalSignupSuccessComponent } from 'app/routes/signup/normal-signup-success/normal-signup-success.component';
import { SuccessAfterActivatingAccountComponent } from 'app/routes/activation-link/success-after-activating-account/success-after-activating-account.component';

const paths: Routes = [
    { path: 'login', component: LoginLayoutComponent, children: [
        { path: '', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'signup/success', component: NormalSignupSuccessComponent },
        { path: 'signup/secure_success', component: SecureSignupSuccessComponent },
        { path: 'activation_link', component: ActivationLinkComponent },
        { path: 'activation_link/success', component: SuccessAfterActivatingAccountComponent },
        { path: 'activation_link/corrupt', component: CorruptActivationLinkComponent },

        { path: 'forgotten_password', component: ForgottenPasswordComponent },

    ] },
    {
        path: '', component: AuthenticatedNavbarComponent, canActivate: [AuthGuardService], children: [
            { path: 'empty', component: EmptyComponent, },
            { path: 'my-profile', component: EditMyInfoComponent, },
            { path: 'my-time', component: MyTimeComponent, },
            { path: 'my-time/add', component: AddMyTimeComponent, },
            { path: 'my-time/edit', component: EditMyTimeComponent },
            { path: 'users', component: UsersComponent, },
            { path: 'users/:id', component: EditOtherUserInfoComponent },
            { path: 'users/:id/role', component: EditRoleComponent, canActivate: [AdminClaimsService] },
            { path: 'users/:id/time', component: OtherUserTimeComponent, canActivate: [AdminClaimsService], },
            { path: 'users/:id/time/add', component: AddOtherUserTimeComponent },
            { path: 'users/:id/time/edit', component: EditOtherUserTimeComponent },
            { path: '', redirectTo: 'empty', pathMatch: 'full' },
            { path: '**', redirectTo: 'empty' }
        ]
    },

]



@NgModule({
    imports: [RouterModule.forRoot(paths)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

