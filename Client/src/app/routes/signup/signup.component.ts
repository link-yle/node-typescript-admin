import { GlobalValidatorsService } from '../../shared/services/global-validators.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { User } from '../../shared/models/user.model';

@Component({
    moduleId: module.id,
    selector: 'app-signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['signup.component.scss']
})
export class SignupComponent implements OnInit {
    form: FormGroup

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private globalValidatorsService: GlobalValidatorsService
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            email: ['', this.globalValidatorsService.mailFormat],
            password: ['', this.globalValidatorsService.passwordFormat],
            confirmPassword: ['', Validators.required],
        })
    }

    onSubmit(obj: User) {
        this.dataService.signup(obj).subscribe(
            data => {
                this.dataService.login({ email: obj.email, password: obj.password }).subscribe(
                    data => this.router.navigate(['/time']),
                    error => this.sb.emitErrorSnackBar()
                )
            },
            error => this.sb.emitErrorSnackBar()
        )
    }

    isIncorrectMailFormat(control: string) {
        return this.form.get(control).hasError('incorrectMailFormat')
    }

    isIncorrectPasswordFormat(control: string) {
        return this.form.get(control).hasError('incorrectPasswordFormat')
    }

    unSimilarPassword(control: string) {
        return this.form.get('password').value !== this.form.get('confirmPassword').value
    }
}
