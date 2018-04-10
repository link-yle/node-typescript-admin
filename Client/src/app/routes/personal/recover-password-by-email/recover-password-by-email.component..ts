import { PublicInfoService } from '../../../shared/services/public.info.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../../../shared/services/data.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'recover-password-by-email.component.html',
})
export class RecoverPasswordByEmailComponent implements OnInit {
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private publicInfoService: PublicInfoService
    ) { }

    ngOnInit() {
        this.buildForm()
    }

    onSubmit(formValue) {
        this.dataService.forgottenPassword(formValue.email).subscribe(
            data => {
                this.publicInfoService.setEmail(formValue.email)
                this.router.navigate(['/login/recover_password_by_email/submit_new_password'])
            },
            error => {
                this.sb.emitErrorSnackBar(error)
            },
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
        })
    }



}
