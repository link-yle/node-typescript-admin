import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SelectedUserService } from '../shared/services/selectedUser.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UsersComponent {

    constructor(
        private authService: AuthService,
        private router: Router,
        private selectedUserService: SelectedUserService
    ) { }
    isAdmin() {
        return this.authService.getProfile().role === 'admin'
    }

    onChangeRoleClick(selectedUser) {
        this.selectedUserService.set(selectedUser)
        this.router.navigate(['/edit-role'])
    }
}
