import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timezone } from '../../../../models/timezone.model';
import { SnackBarService } from '../../../../services/snackbar.service';
import { DataService } from '../../../../services/data.service';

@Component({
    selector: 'app-add-time',
    templateUrl: 'add-time.component.html',
})
export class AddTimeComponent implements OnInit {
    timeZone: Timezone
    @Input() profileId: string
    @Output() added = new EventEmitter
    constructor(
        private dataService: DataService,
        private sb: SnackBarService,
    ) { }

    ngOnInit() {
        this.timeZone = { name: '', city: '', gmtTimeDifference: 0 }
    }


    onSubmitted(x: Timezone) {
        this.dataService.addTimeZone(this.profileId, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.added.emit()
            },
            error => this.sb.emitErrorSnackBar(error)

        )
    }

}
