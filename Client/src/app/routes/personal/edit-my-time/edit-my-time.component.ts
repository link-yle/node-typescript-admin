import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from 'app/shared/services/data.service';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { Timezone } from 'app/shared/models/timezone.model';
import { TimingsService } from 'app/shared/services/timings.service';

@Component({
    templateUrl: 'edit-my-time.component.html',
})
export class EditMyTimeComponent implements OnInit {
    timeZone

    constructor(
        private authService: AuthService,
        private router: Router,
        private dataService: DataService,
        private sb: SnackBarService,
        private timingsService: TimingsService
    ) { }

    ngOnInit() {
        if (!this.timingsService.getSelectedTiming()) this.router.navigate(['/my-time'])
        this.timeZone = this.timingsService.getSelectedTiming()
    }

    onSubmitted(x: { name: string, city: string, gmtTimeDifference: number }) {
        this.dataService.updateTimeZone(this.authService.getId(), this.timeZone._id, x).first().subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/my-time'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }


}
