import { SnackBarService } from '../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../shared/services/data.service';
import { forgottenPasswordLink } from 'app/shared/config/auth-links';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: 'forgotten-password.component.html',
})
export class ForgottenPasswordComponent implements OnInit {
    form: FormGroup
    isRecoveryLinkSent: boolean
    loading: boolean

    constructor(
        private fb: FormBuilder,
        private globalValidatorsService: GlobalValidatorsService,
        private dataService: DataService,
        private sb: SnackBarService
    ) { }

    ngOnInit() {
        this.buildForm()
    }

    onSubmit(formValue) {
        this.loading = true
        this.dataService.forgottenPassword(formValue.email, forgottenPasswordLink).subscribe(
            data => {
                this.isRecoveryLinkSent = true
                this.loading = false
            }, 
            error => {
                this.sb.emitErrorSnackBar(error)
                this.loading = false
            },
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([this.globalValidatorsService.mailFormat, Validators.required])],
        })
    }



}
