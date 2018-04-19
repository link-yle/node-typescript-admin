import { Subject } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminClaimsService } from '../../core/services/admin-claims.service';
import { SelectedUserService } from '../../core/services/selectedUser.service';
import { User } from '../../shared/models/user.model';
import { DataService } from '../../core/services/data.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    templateUrl: 'users.component.html',
})
export class UsersComponent implements OnInit, OnDestroy {
    users: User[] = []
    totalItems: number
    searchTerm: string
    currentPage: number
    keyUp$ = new Subject<string>()
    searchSubscription: Subscription
    constructor(
        private adminClaimsService: AdminClaimsService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private dataService: DataService,
        private sb: SnackBarService,
        private authService: AuthService
    ) { }


    ngOnInit() {
        this.fetchUsers({ page: 1 })
        this.searchSubscription =
            this.keyUp$.debounceTime(400).distinctUntilChanged().subscribe(() => {
                this.fetchConsideringPaging()
            })
    }

    public fetchConsideringPaging() {
        if (this.currentPage === 1) {
            this.fetchUsers({ page: 1 })
        }  else {
            this.currentPage = 1
        }
    }

    public fetchUsers({ page }) {
        this.dataService.getUsers({ searchTerm: this.searchTerm, skip: (page - 1) * 10 }).first().subscribe(
            data => {
                this.users = data.users
                this.totalItems = data.count
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    isAdmin() {
        return this.authService.getRole() === 'admin'
    }

    onChangeRoleClick(item) {
        this.selectedUserService.set(item)
        this.router.navigate(['/users', item._id, 'role'])
    }

    onDeleteClick(selectedUser) {
        this.dataService.deleteUser(selectedUser._id).subscribe(
            data => this.fetchUsers({ page: this.currentPage }),
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
        this.searchSubscription.unsubscribe()
    }

    onActivateClick(item) {
        this.dataService.activateUserAdministratively(item._id).subscribe(
            data => item.active = true,
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
