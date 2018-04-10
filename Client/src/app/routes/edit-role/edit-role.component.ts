import { DataService } from '../../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../core/services/snackbar.service';
import { SelectedUserService } from '../../core/services/selectedUser.service';
import { User } from 'app/shared/models/user.model';

@Component({
    templateUrl: 'edit-role.component.html',
})
export class EditRoleComponent implements OnInit {
    user: User
    constructor(
        private dataService: DataService,
        private router: Router,
        private selectedUserService: SelectedUserService,
        private sb: SnackBarService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).first().subscribe( user => this.user = user)
    }

    onAssignClick() {
        this.dataService.assignRole(this.user._id  , { role: this.user.role }).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
