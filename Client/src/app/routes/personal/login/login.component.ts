import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/services/data.service';
import { SnackBarService } from '../../../core/services/snackbar.service';
import { AuthService } from '../../../core/services/auth.service';
import { passwordPattern } from 'app/shared/config/constants';

@Component({
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup
    isRegisteredButNotActive

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([Validators.email, Validators.required])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
        })
    }

    onSubmit(loginForm) {
        this.dataService.login(loginForm).subscribe(
            data => {
                this.authService.saveToken(data.token)
                this.authService.saveProfile(data.user)
                this.router.navigate(['empty'])
            },
            error => this.handleLoginError(error)
        )
    }

    private handleLoginError(error: Response | any) {
        const body = error.json()
        if (error.status === 403)  {
            return this.isRegisteredButNotActive = true;
        } else {
            const err = body.error || JSON.stringify(body);
            this.sb.emitErrorSnackBar();
        }
    }


}
