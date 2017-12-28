import { GlobalValidatorsService } from '../../shared/services/global-validators.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../shared/services/data.service';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
})
export class LoginComponent implements OnInit {
    form: FormGroup

    constructor(private fb: FormBuilder,
        private dataService: DataService,
        private sb: SnackBarService,
        private router: Router,
        private globalValidatorsService: GlobalValidatorsService,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            email: ['', Validators.compose([this.globalValidatorsService.mailFormat, Validators.required])],
            password: ['', Validators.required],
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
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        if (error.status === 403) this.router.navigate([''])
        else if ( error.status === 401)  this.sb.emitErrorSnackBar(err)
    }


}
