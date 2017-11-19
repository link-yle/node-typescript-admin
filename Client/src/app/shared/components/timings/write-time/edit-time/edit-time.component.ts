import { TimingsService } from '../../timings.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { Timezone } from '../../../shared/models/timezone.model';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'app-editime',
    templateUrl: 'editime.component.html',
    styleUrls: ['editime.component.scss']
})
export class EditimeComponent {
    form: FormGroup
    selectedTiming: Timezone
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private timingsService: TimingsService,
        private authService: AuthService,
        private router: Router

    ) {
        this.selectedTiming = this.timingsService.getSelectedTiming()
        this.buildForm()
    }


    private buildForm() {
        this.form = this.fb.group({
            name: [this.selectedTiming.name, Validators.required],
            city: [this.selectedTiming.city, Validators.required],
            gmtTimeDifference: [this.selectedTiming.gmtTimeDifference, Validators.required],
        })
    }

    onSubmitted(x: Timezone) {
        this.dataService.updateTimeZone(this.authService.getProfile()._id, this.timingsService.getSelectedTiming()._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/timing'])
            },
            error => this.sb.emitErrorSnackBar()
        )
    }
}
