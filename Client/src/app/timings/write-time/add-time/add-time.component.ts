import { AuthService } from '../../../shared/services/auth.service';
import { Component } from '@angular/core';
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
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
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
        this.dataService.addTimeZone(this.authService.getProfile()._id, x).subscribe(
            data => {
                this.sb.emitSuccessSnackBar()
                this.router.navigate(['/timing'])
            },
            error => this.sb.emitErrorSnackBar()

        )
    }

}
