import { LoginComponent } from './routes/personal/login/login.component';
import {
    PasswordRecoveredSuccessfullyComponent,
} from './routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/password-recovered-successfully/password-recovered-successfully.component';
import {
    NewPasswordAndRecoveryCodeSubmissionComponent,
} from './routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/new-password-and-recovery-code-submission.component';
import {
    RecoverPasswordByEmailComponent,
} from './routes/personal/recover-password-by-email/recover-password-by-email.component.';
import {
    ChangeMyPasswordUsingOldPasswordComponent,
} from './routes/personal/edit-my-info/change-my-password-using-old-password/change-my-password-using-old-password.component';
import {
    AuthenticatedNavbarComponent,
} from './shared/components/layout/authenticated-navbar/authenticated-navbar.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { SignupComponent } from './routes/signup/signup.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { UsersComponent } from './routes/users-list/users.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { EditRoleComponent } from './routes/edit-role/edit-role.component';
import { AddOtherUserTimeComponent } from './routes/add-other-user-time/add-other-user-time.component';
import { EditUserComponent } from './shared/components/users/edit-user/edit-user.component';
import { EditOtherUserInfoComponent } from './routes/edit-other-user-info/edit-other-user-info.component';
import { EmptyComponent } from './routes/empty/empty.component';
import { LoginLayoutComponent } from './shared/components/layout/login-layout/login-layout.component';
import { EditOtherUserTimeComponent } from './routes/edit-other-user-time/edit-other-user-time.component';
// tslint:disable-next-line:max-line-length
import { ActivationLinkComponent } from './routes/activation-link/activation-link.component';
import { SecureSignupSuccessComponent } from 'app/routes/signup/secure-signup-success/secure-signup-success.component';
import { NormalSignupSuccessComponent } from 'app/routes/signup/normal-signup-success/normal-signup-success.component';
import { EditMyInfoComponent } from 'app/routes/personal/edit-my-info/edit-my-info.component';
import { MyTimeComponent } from 'app/routes/personal/my-time/my-time.component';
import { AddMyTimeComponent } from 'app/routes/personal/add-my-time/add-my-time.component';
import { EditMyTimeComponent } from 'app/routes/personal/edit-my-time/edit-my-time.component';
import { ChangeOtherUserPasswordComponent } from 'app/routes/change-other-user-password/change-other-user-password.component';
import { CorruptLinkComponent } from 'app/routes/corrupt-link/corrupt-link.component';

const paths: Routes = [
    { path: 'login', component: LoginLayoutComponent, children: [
        { path: '', component: LoginComponent },
        { path: 'signup', component: SignupComponent },
        { path: 'signup/success', component: NormalSignupSuccessComponent },
        { path: 'signup/secure_success', component: SecureSignupSuccessComponent },
        { path: 'activation_link', component: ActivationLinkComponent },

        { path: 'recover_password_by_email', component: RecoverPasswordByEmailComponent },
        { path: 'recover_password_by_email/submit_new_password', component: NewPasswordAndRecoveryCodeSubmissionComponent },
        { path: 'recover_password_by_email/submit_new_password/password_recovered_successfully', component: PasswordRecoveredSuccessfullyComponent },
        
        


        { path: 'corrupt', component: CorruptLinkComponent },
        
        

    ] },
    {
        path: '', component: AuthenticatedNavbarComponent, canActivate: [AuthGuardService], children: [
            { path: 'empty', component: EmptyComponent, },
            { path: 'my-profile', component: EditMyInfoComponent, },
            { path: 'my-profile/password', component: ChangeMyPasswordUsingOldPasswordComponent },
            { path: 'my-time', component: MyTimeComponent, },
            { path: 'my-time/add', component: AddMyTimeComponent, },
            { path: 'my-time/edit', component: EditMyTimeComponent },
            { path: 'users', component: UsersComponent, },
            { path: 'users/:id', component: EditOtherUserInfoComponent },
            { path: 'users/:id/password', component: ChangeOtherUserPasswordComponent },
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

