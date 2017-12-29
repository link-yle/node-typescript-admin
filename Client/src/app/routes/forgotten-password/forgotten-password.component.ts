import { SnackBarService } from '../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../shared/services/data.service';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: 'forgotten-password.component.html',
})
export class ForgottenPasswordComponent implements OnInit {
    form: FormGroup
    isRecoveryLinkSent: boolean

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
        this.dataService.forgottenPassword(formValue.email, window.location.origin).subscribe(
            data => {
                this.isRecoveryLinkSent = true
            }, error => this.sb.emitErrorSnackBar(error)
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([this.globalValidatorsService.mailFormat, Validators.required])],
        })
    }



}
