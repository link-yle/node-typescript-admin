import {
    AuthenticatedNavbarComponent,
} from './shared/components/layout/authenticated-navbar/authenticated-navbar.component';
import { EditMyTimeComponent } from './routes/edit-my-time/edit-my-time.component';
import { AuthGuardService } from './shared/services/auth.guard.service';
import { SignupComponent } from './routes/signup/signup.component';
import { EditMyInfoComponent } from './routes/edit-my-info/edit-my-info.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ManagerClaimsService } from './shared/services/manager-claims.service';
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

const paths: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    {
        path: '', component: AuthenticatedNavbarComponent, canActivate: [AuthGuardService], children: [
            { path: 'empty', component: EmptyComponent, },
            { path: 'my-profile', component: EditMyInfoComponent, },
            { path: 'my-time', component: MyTimeComponent, },
            { path: 'my-time/add', component: AddMyTimeComponent, },
            { path: 'my-time/edit', component: EditMyTimeComponent },
            { path: 'users', component: UsersComponent, canActivate: [ManagerClaimsService], },
            { path: 'users/:id', component: EditUserComponent, canActivate: [ManagerClaimsService], },
            { path: 'users/:id/role', component: EditRoleComponent, canActivate: [AdminClaimsService] },
            { path: 'users/:id/time', component: OtherUserTimeComponent, canActivate: [AdminClaimsService], },
            { path: 'users/:id/time/add', component: AddOtherUserTimeComponent },
            { path: 'users/:id/time/add/:id', component: EditOtherUserInfoComponent },
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

