import { Component, OnInit } from '@angular/core';
import { SelectedUserService } from '../../core/services/selectedUser.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Timezone } from 'app/shared/models/timezone.model';
import { User } from 'app/shared/models/user.model';
import { DataService } from 'app/core/services/data.service';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { TimingsService } from 'app/core/services/timings.service';

@Component({
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
        this.user = this.selectedUserService.get()
        if (!this.user) this.router.navigate(['/users/'])
        this.timeZone = this.timingsService.getSelectedTiming()
    }

    onSubmitted(x: Timezone) {
        this.dataService.updateTimeZone(this.user._id, this.timingsService.getSelectedTiming()._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/users/', this.user._id, 'time'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }




}
