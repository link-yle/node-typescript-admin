import { AuthService } from '../../../shared/services/auth.service';
import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { DataService } from '../../../shared/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Timezone } from '../../../shared/models/timezone.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-time',
    templateUrl: 'add-time.component.html',
    styleUrls: ['add-time.component.scss']
})
export class AddTimeComponent {
    form
    @Input() profileId: string
    @Output() added = new EventEmitter
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private authService: AuthService
    ) {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            gmtTimeDifference: ['', Validators.required],
        })
    }

    onSubmitted(x: Timezone) {
        this.dataService.addTimeZone(this.profileId, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.added.emit()
            },
            error => this.sb.emitErrorSnackBar()

        )
    }

}
