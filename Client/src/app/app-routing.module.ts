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

const paths: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'my-time', component: MyTimeComponent, canActivate: [TokenExpiryService], },
    {
        path: 'users', component: UsersComponent, canActivate: [TokenExpiryService, ManagerClaimsService],
        children: [
            { path: '/:id', component: EditUserComponent, canActivate: [TokenExpiryService, ManagerClaimsService] },
            { path: '/:id/role', component: EditRoleComponent, canActivate: [TokenExpiryService, AdminClaimsService] },
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

