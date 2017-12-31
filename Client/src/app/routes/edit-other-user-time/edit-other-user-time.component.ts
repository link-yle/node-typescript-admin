import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../shared/services/selectedUser.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Timezone } from 'app/shared/models/timezone.model';
import { User } from 'app/shared/models/user.model';
import { DataService } from 'app/shared/services/data.service';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { TimingsService } from 'app/shared/services/timings.service';

@Component({
    selector: 'app-edit-other-user-time',
    templateUrl: 'edit-other-user-time.component.html',
})
export class EditOtherUserTimeComponent implements OnInit {
    user: User
    timeZone: Timezone

    constructor(
        private selectedUserService: SelectedUserService,
        private router: Router,
        private route: ActivatedRoute,
        private dataService: DataService,
        private sb: SnackBarService,
        private timingsService: TimingsService

    ) { }

    ngOnInit() {
        if(!this.selectedUserService.get()) this.router.navigate(['/users/'])
        this.timeZone = this.timingsService.getSelectedTiming()
    }

    onSubmitted(x: Timezone) {
        this.dataService.updateTimeZone(this.selectedUserService.get()._id, this.timingsService.getSelectedTiming()._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users/', this.selectedUserService.get()._id, 'time'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }




}
