import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminClaimsService } from '../../shared/services/admin-claims.service';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
    users: User[] = []
    totalItems: number
    searchTerm: string
    keyUp$ = new Subject<string>()
    constructor(
        private adminClaimsService: AdminClaimsService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private dataService: DataService,
        private sb: SnackBarService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.fetchUsers({})
        const searchSubscription =
            this.keyUp$.debounceTime(400).distinctUntilChanged().subscribe(searchTerm => this.fetchUsers({ searchTerm }))
    }



    private fetchUsers({ searchTerm = '', skip = 0 }) {
        const initialSub = this.dataService.getUsers({searchTerm, skip}).first().subscribe(
            data => {
                this.users = data.users
                this.totalItems = data.count
            },
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
            data => this.fetchUsers({ searchTerm: this.searchTerm }),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    onUpdateClick(item) {
        this.selectedUserService.set(item)
        this.router.navigate(['/users', item._id])
    }

    onTimingsClick(item) {
        this.selectedUserService.set(item)
        this.router.navigate(['/users', item._id, 'time'])
    }

    ngOnDestroy() {

    }

    pageChanged({ page, itemsPerPage }) {
        this.fetchUsers({ searchTerm: this.searchTerm, skip: (page - 1) * 10 })

    }
}
