import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { Router } from '@angular/router';

@Component({
    templateUrl: 'new-password.component.html',
})
export class NewPasswordComponent implements OnInit {
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private globalValidatorsService: GlobalValidatorsService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            password: ['', Validators.compose([Validators.required, this.globalValidatorsService.passwordFormat])],
            confirmPassword: ['', Validators.required],
        })
    }


    signup() {
        this.dataService.signup(this.form.value).subscribe(
            data => {
                this.dataService.login({ email: this.form.value.email, password: this.form.value.password }).subscribe(
                    data => this.router.navigate(['/']),
                    error => {
                        this.sb.emitErrorSnackBar(error)
                    }
                )
            },
            error => this.sb.emitErrorSnackBar(error)
        )
    }


    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('password').value !== formControl.value && !formControl.pristine
    }



}

