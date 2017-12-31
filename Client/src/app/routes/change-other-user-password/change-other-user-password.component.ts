import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { SelectedUserService } from 'app/shared/services/selectedUser.service';
import { User } from 'app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'change-other-user-password.component.html',
})
export class ChangeOtherUserPasswordComponent {
    form: FormGroup
    user: User

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService,
        private selectedUserService: SelectedUserService,
        private router: Router

    ) {
    }

    ngOnInit() {
        this.user = this.selectedUserService.get() 
        if (!this.user) this.router.navigate(['users'])
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            newPassword: ['', Validators.compose([Validators.required, this.globalValidatorsService.passwordFormat])],
            confirmNewPassword: ['', Validators.required],
        })
    }


    changepassword() {
        this.dataService.changeOtherUserPassword(this.user._id, this.form.value.newPassword).subscribe(
            data => {
                this.sb.emitSuccessSnackBar(`${this.user.name}'s password has been updated successfully`)
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
