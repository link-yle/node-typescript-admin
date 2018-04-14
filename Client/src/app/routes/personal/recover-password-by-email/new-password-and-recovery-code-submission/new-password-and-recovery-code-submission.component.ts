import { PublicInfoService } from '../../../../core/services/public.info.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from '../../../../core/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../core/services/data.service';
import { Router } from '@angular/router';
import { passwordPattern } from 'app/shared/config/constants';
@Component({
    templateUrl: 'new-password-and-recovery-code-submission.component.html',
})
export class NewPasswordAndRecoveryCodeSubmissionComponent implements OnInit {

    form: FormGroup
    constructor(
        private dataService: DataService,
        private router: Router,
        private sb: SnackBarService,
        private fb: FormBuilder,
        private publicInfoService: PublicInfoService
    ) {  }


    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            email: [this.publicInfoService.getEmail() || '', Validators.compose([Validators.required, Validators.email])],
            recoveryCode: ['', Validators.compose([Validators.required, Validators.minLength(20), Validators.maxLength(20)])],
            newPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            confirmPassword: ['', Validators.required],
        }, { validator: this.areEqual })
    }

    private areEqual(group) {
        return group.get('newPassword').value === group.get('confirmPassword').value ? null : { areEqual: true }
    }

    changePassword({recoveryCode, newPassword, email}) {
        this.dataService.changeMyPasswordUsingRecoveryCode({recoveryCode, newPassword, email}).subscribe(
            data => {
                this.router.navigate(['/login/recover_password_by_email/submit_new_password/password_recovered_successfully'])
            },
            () => this.sb.emitErrorSnackBar('An error occurred. Please try again later')
        )
    }


}

