import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { SelectedUserService } from 'app/shared/services/selectedUser.service';
import { User } from 'app/shared/models/user.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: 'change-other-user-password.component.html',
})
export class ChangeOtherUserPasswordComponent {
    user: User

    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute

    ) {
    }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).first().subscribe(
            data => this.user = data,
            error =>  this.router.navigate(['users'])
        )
        
    }

    
    changePassword(formValue) {
        this.dataService.changeOtherUserPassword(this.user._id, formValue.newPassword).subscribe(
            data => {
                this.sb.emitSuccessSnackBar(`${this.user.name}'s password has been updated successfully`)
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

  

}
