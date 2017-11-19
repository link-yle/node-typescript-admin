import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AdminClaimsService } from '../../shared/services/admin-claims.service';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UsersComponent {

    constructor(
        private adminClaimsService: AdminClaimsService,
        private router: Router,
        private selectedUserService: SelectedUserService
    ) { }

    isAdmin() {
        return this.adminClaimsService.canActivate()
    }

    onChangeRoleClick(selectedUser) {
        this.selectedUserService.set(selectedUser)
        this.router.navigate(['/role'])
    }
}
