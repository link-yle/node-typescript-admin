import { PublicInfoService } from '../../../../shared/services/public.info.service';
import { GlobalValidatorsService } from '../../../../shared/services/global-validators.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarService } from '../../../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';
import { Router } from '@angular/router';
@Component({
    selector: 'new-password-and-recovery-code-submission',
    templateUrl: 'new-password-and-recovery-code-submission.component.html',
})
export class NewPasswordAndRecoveryCodeSubmissionComponent implements OnInit {

    form: FormGroup
    constructor(
        private dataService: DataService,
        private router: Router,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService,
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
            newPassword: ['', Validators.compose([Validators.required, this.globalValidatorsService.passwordFormat])],
            confirmNewPassword: ['', Validators.required],
        })
    }



    changePassword({recoveryCode, newPassword, email}) {

        this.dataService.changeMyPasswordUsingRecoveryCode({recoveryCode, newPassword, email}).subscribe(
            data => {
                this.router.navigate(['/login/recover_password_by_email/submit_new_password/password_recovered_successfully'])
            },
            () => this.sb.emitErrorSnackBar('An error occurred. Please try again later')
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

