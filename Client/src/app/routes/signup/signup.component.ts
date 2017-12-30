import { GlobalValidatorsService } from '../../shared/services/global-validators.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { User } from '../../shared/models/user.model';
import { PublicInfoService } from '../../shared/services/public.info.service';
import { signUpSecurelyActivationLink } from 'app/shared/config/auth-links';

@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    form: FormGroup
    loading: boolean
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private globalValidatorsService: GlobalValidatorsService,
        private publicInfoService: PublicInfoService,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.compose([Validators.required, this.globalValidatorsService.nameFormat])],
            email: ['', Validators.compose([Validators.required, this.globalValidatorsService.mailFormat])],
            password: ['', Validators.compose([Validators.required, this.globalValidatorsService.passwordFormat])],
            confirmPassword: ['', Validators.required],
        })
    }

    signup() {
        this.dataService.signup(this.form.value).subscribe(
            data => this.router.navigate(['/login/signup/success']),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    signupSecurely() {
        this.loading= true;
        this.dataService.signupSecurely(this.form.value, signUpSecurelyActivationLink).subscribe(
            data => {
                this.publicInfoService.setEmail(this.form.value.email)
                this.publicInfoService.setPass(this.form.value.password)
                this.router.navigate(['/login/signup/secure_success'])
            },
            error => {
                this.sb.emitErrorSnackBar(error)
                this.loading = false
            }
        )
    }
    // Your account has been successfully created please check your email

    isIncorrectNameFormat(control: string) {
        return this.form.get(control).hasError('incorrectNameFormat')
    }

    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('password').value !== formControl.value && !formControl.pristine
    }
}
