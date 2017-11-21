import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AdminClaimsService } from '../../shared/services/admin-claims.service';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
    styleUrls: ['users.component.scss']
})
export class UsersComponent implements OnInit {
    users: User[] = []
    constructor(
        private adminClaimsService: AdminClaimsService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private dataService: DataService,
        private sb: SnackBarService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.fetchUsers()
    }

    private fetchUsers() {
        this.dataService.getUsers().subscribe(
            data => this.users = data,
            error => this.sb.emitErrorSnackBar(error)
        )
    }
    isAdmin() {
        return this.authService.getProfile().role === 'admin'
    }

    onChangeRoleClick(item) {
        this.selectedUserService.set(item)
        this.router.navigate(['/users', item._id, 'role'])
    }

    onDeleteClick(selectedUser) {
        this.dataService.deleteUser(selectedUser._id).subscribe(
            data => this.fetchUsers(),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onUpdateClick(item) {
        this.selectedUserService.set(item)
        this.router.navigate(['/users', item._id])
    }
}
