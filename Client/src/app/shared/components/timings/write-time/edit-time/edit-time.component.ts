import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Timezone } from '../../../../models/timezone.model';
import { SnackBarService } from '../../../../services/snackbar.service';
import { TimingsService } from '../../../../services/timings.service';
import { DataService } from '../../../../services/data.service';

@Component({
    selector: 'app-edit-time',
    templateUrl: 'edit-time.component.html',
})
export class EditimeComponent implements OnInit {
    timeZone: Timezone
    @Input() profileId: string
    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
        private timingsService: TimingsService,
    ) { }

    ngOnInit() {
        this.timeZone = this.timingsService.getSelectedTiming()
    }

    onSubmitted(x: Timezone) {
        this.dataService.updateTimeZone(this.profileId, this.timingsService.getSelectedTiming()._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }
}
