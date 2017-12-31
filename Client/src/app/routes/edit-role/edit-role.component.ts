import { DataService } from '../../shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

@Component({
    selector: 'app-edit-role',
    templateUrl: 'edit-role.component.html',
})
export class EditRoleComponent implements OnInit {
    userRole: string
    userId: string
    userName: string
    constructor(
        private dataService: DataService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private sb: SnackBarService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).subscribe(
            user => {
                this.userRole = user.role
                this.userId = user._id
                this.userName = user.name
            }
        )
       
    }

    onAssignClick() {
        this.dataService.assignRole(this.userId, { role: this.userRole }).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
