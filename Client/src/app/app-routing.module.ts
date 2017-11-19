import { EditimeComponent } from './timings/write-time/edit-time/edit-time.component';
import { TokenExpiryService } from './shared/services/token-expiry.service';
import { UsersComponent } from './users/users.component';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from './shared/services/auth.service';
import { MyTimeComponent } from './timings/view-time/my-time/my-time.component';
import { HomeComponent } from './home/home.component';
import { ManagerClaimsService } from './shared/services/manager-claims.service';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AdminClaimsService } from './shared/services/admin-claims.service';
import { EditRoleComponent } from './users/edit-role/edit-role.component';
import { OtherUserTimeComponent } from './timings/view-time/other-user-time/other-user-time.component';
import { AddTimeComponent } from './timings/write-time/add-time/add-time.component';

const paths: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'my-time', component: MyTimeComponent, canActivate: [TokenExpiryService],
        children: [
            { path: '/add', component: AddTimeComponent },
            { path: '/:id', component: EditimeComponent },
        ]
    },
    {
        path: 'users', component: UsersComponent, canActivate: [TokenExpiryService, ManagerClaimsService],
        children: [
            {
                path: '/:id', component: EditUserComponent, canActivate: [TokenExpiryService, ManagerClaimsService],
                children: [
                    {
                        path: '/time', component: OtherUserTimeComponent, canActivate: [TokenExpiryService, AdminClaimsService],
                        children: [
                            { path: '/add', component: AddTimeComponent },
                            { path: '/:id', component: EditimeComponent },
                        ]
                    },
                    { path: '/role', component: EditRoleComponent, canActivate: [TokenExpiryService, AdminClaimsService] },
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

