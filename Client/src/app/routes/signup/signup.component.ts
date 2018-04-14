import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../core/services/data.service';
import { SnackBarService } from '../../core/services/snackbar.service';
import { User } from '../../shared/models/user.model';
import { PublicInfoService } from '../../core/services/public.info.service';
import { passwordPattern } from 'app/shared/config/constants';

@Component({
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    form: FormGroup
    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private publicInfoService: PublicInfoService,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.email])],
            passwords: this.fb.group({
                password: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
                confirmPassword: ['', Validators.required],
            }, { validator: this.areEqual })

        })
    }

    private areEqual(group) {
        return group.get('password').value === group.get('confirmPassword').value ? null : { areEqual: true }
    }

    signup() {
        this.dataService.signup(this.form.value).subscribe(
            data => this.router.navigate(['/login/signup/success']),
            error => this.sb.emitErrorSnackBar(error)
        )
    }

    signupSecurely() {
        this.dataService.signupSecurely(this.form.value).subscribe(
            data => {
                this.publicInfoService.setEmail(this.form.value.email)
                this.publicInfoService.setPass(this.form.value.password)
                this.router.navigate(['/login/signup/activate'])
            },
            error => {
                this.sb.emitErrorSnackBar(error)
            }
        )
    }

    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('password').value !== formControl.value && !formControl.pristine
    }
}
