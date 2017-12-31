import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { Timezone } from 'app/shared/models/timezone.model';
import { User } from 'app/shared/models/user.model';
import { DataService } from 'app/shared/services/data.service';

@Component({
    selector: 'app-add-other-user-time',
    templateUrl: 'add-other-user-time.component.html',
})
export class AddOtherUserTimeComponent implements OnInit {
    user: User
    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute,
        private sb: SnackBarService,
        private dataService: DataService
    ) { }

    ngOnInit() {
        this.selectedUserService.getUserWithProbableDataFetch(this.route.params).subscribe(
            user => this.user = user
        )
    }


    onSubmitted(x: Timezone) {
        this.dataService.addTimeZone(this.user._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users/', this.user._id, 'time' ])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }



}
