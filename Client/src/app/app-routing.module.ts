import { EditMyInfoComponent } from './routes/edit-my-info/edit-my-info.component';
import { TokenExpiryService } from './shared/services/token-expiry.service';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from './shared/services/auth.service';
import { ManagerClaimsService } from './shared/services/manager-claims.service';
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { HomeComponent } from './routes/home/home.component';
import { MyTimeComponent } from './routes/my-time/my-time.component';
import { AddTimeComponent } from './shared/components/timings/write-time/add-time/add-time.component';
import { EditimeComponent } from './shared/components/timings/write-time/edit-time/edit-time.component';
import { UsersComponent } from './routes/users-list/users.component';
import { EditUserComponent } from './shared/components/users/edit-user/edit-user.component';
import { OtherUserTimeComponent } from './routes/other-user-time/other-user-time.component';
import { EditRoleComponent } from './routes/edit-role/edit-role.component';

const paths: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'my-time', component: MyTimeComponent, canActivate: [TokenExpiryService],
        children: [
            { path: 'add', component: AddTimeComponent },
            { path: ':id', component: EditimeComponent },
        ]
    },
    { path: 'my-profile', component: EditMyInfoComponent },
    {
        path: 'users', component: UsersComponent, canActivate: [TokenExpiryService, ManagerClaimsService],
        children: [
            {
                path: ':id', component: EditUserComponent, canActivate: [TokenExpiryService, ManagerClaimsService],
                children: [
                    {
                        path: 'time', component: OtherUserTimeComponent, canActivate: [TokenExpiryService, AdminClaimsService],
                        children: [
                            { path: 'add', component: AddTimeComponent },
                            { path: ':id', component: EditimeComponent },
                        ]
                    },
                    { path: 'role', component: EditRoleComponent, canActivate: [TokenExpiryService, AdminClaimsService] },
                ]
            },

        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
]



@NgModule({
    imports: [RouterModule.forRoot(paths)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

