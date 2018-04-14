import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../../core/services/data.service';
import { SnackBarService } from '../../../../core/services/snackbar.service';
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
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            oldPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            newPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            confirmPassword: ['', Validators.required],
        }, { validator: this.areEqual })
    }

    private areEqual(group) {
        return group.get('newPassword').value === group.get('confirmPassword').value ? null : { areEqual: true }
    }

    changepassword() {
        this.dataService.changePasswordUsingOldPassword({oldPassword: this.form.value.oldPassword, newPassword: this.form.value.newPassword}).subscribe(
            data => {
                this.sb.emitSuccessSnackBar('Your password has been updated successfully')
                this.buildForm()
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('newPassword').value !== formControl.value && !formControl.pristine
    }

}
