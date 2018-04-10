import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../../../shared/services/data.service';
import { SnackBarService } from '../../../../shared/services/snackbar.service';
import { passwordPattern } from 'app/shared/config/constants';

@Component({
    templateUrl: 'change-my-password-using-old-password.component.html',
})
export class ChangeMyPasswordUsingOldPasswordComponent implements OnInit {
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            oldPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            newPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            confirmNewPassword: ['', Validators.required],
        })
    }


    changepassword() {
        this.dataService.changePasswordUsingOldPassword(this.form.value).subscribe(
            data => {
                this.sb.emitSuccessSnackBar('Your password has been updated successfully')
                this.buildForm()
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    isIncorrectPasswordFormat(control: string) {
        return this.form.get(control).hasError('incorrectPasswordFormat')
    }


    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('newPassword').value !== formControl.value && !formControl.pristine
    }

}
