import { SnackBarService } from '../../shared/services/snackbar.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../shared/services/data.service';
import { forgottenPasswordLink } from 'app/shared/config/auth-links';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgotten-password',
    templateUrl: 'forgotten-password-form.component.html',
})
export class ForgottenPasswordFormComponent implements OnInit {
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private globalValidatorsService: GlobalValidatorsService,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router
    ) { }

    ngOnInit() {
        this.buildForm()
    }

    onSubmit(formValue) {
        this.dataService.forgottenPassword(formValue.email, forgottenPasswordLink).subscribe(
            data => {
                this.router.navigate(['/login/forgotten_password_form/success'])  
            }, 
            error => {
                this.sb.emitErrorSnackBar(error)
            },
        )
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([this.globalValidatorsService.mailFormat, Validators.required])],
        })
    }



}
