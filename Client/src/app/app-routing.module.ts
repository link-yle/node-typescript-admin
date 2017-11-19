import { MyProfileComponent } from './routes/my-profile/my-profile.component';
import { TokenExpiryService } from './shared/services/token-expiry.service';
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from './shared/services/auth.service';
import { ManagerClaimsService } from './shared/services/manager-claims.service';
import { AdminClaimsService } from './shared/services/admin-claims.service';

const paths: Routes = [
    { path: 'home', component: HomeComponent },
    {
        path: 'my-time', component: MyTimeComponent, canActivate: [TokenExpiryService],
        children: [
            { path: '/add', component: AddTimeComponent },
            { path: '/:id', component: EditimeComponent },
        ]
    },
    { path: 'my-profile', component: MyProfileComponent },
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

