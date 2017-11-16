import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { SnackBarService } from '../shared/services/snackbar.service';
import { GlobalValidators } from '../shared/services/global-validators.service';

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
        private sb: SnackBarService) {
    }

    ngOnInit() {

    }

    buildForm() {
        this.form = this.fb.group({
            firstName: ['', Validators.required],
            email: ['', GlobalValidators.mailFormat],
            password: ['', GlobalValidators.passwordFormat],
            confirmPassword: ['', Validators.required],
        })
    }


    isIncorrectMailFormat(control) {
        return this.form.get(control).hasError('incorrectMailFormat')
    }

    unSimilarPassword(control) {
        return this.form.get('password').value !== this.form.get('confirmPassword').value
    }
}
