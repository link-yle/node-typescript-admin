import { SnackBarService } from '../../../shared/services/snackbar.service';
import { DataService } from '../../../shared/services/data.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PublicInfoService } from '../../../shared/services/public.info.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'activate-after-signup.component.html',
})
export class ActivateAfterSignupComponent implements OnInit {

    form: FormGroup
    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private publicInfoService: PublicInfoService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            email: [this.publicInfoService.getEmail() || '',
            Validators.compose([Validators.required, Validators.email])],
            activationCode: ['', Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(20)])],
        })
    }

    submit({ activationCode, email }) {
        this.dataService.activateFromBackEnd(activationCode, email).subscribe(
            data => {
                this.router.navigate(['login/signup/success'])
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

}
