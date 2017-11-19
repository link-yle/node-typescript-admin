import { DataService } from '../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-edit-role',
    templateUrl: 'edit-role.component.html',
})
export class EditRoleComponent implements OnInit {
    userRole: string
    constructor(
        private dataService: DataService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private sb: SnackBarService
    ) {}

    ngOnInit() {
        this.userRole = this.selectedUserService.get().role
    }
    onAssignClick() {
        this.dataService.assignRole(this.selectedUserService.get()._id, { role: this.userRole }).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users'])
            }
        )
    }

}
