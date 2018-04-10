import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';
import { passwordPattern } from 'app/shared/config/constants';

@Component({
    selector: 'app-new-password-form',
    templateUrl: 'new-password-form.component.html',
})
export class NewPasswordFormComponent implements OnInit {

    @Output() formSubmitted = new EventEmitter
    form: FormGroup

    constructor(
        private fb: FormBuilder,
    ) {  }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            newPassword: ['', Validators.compose([Validators.required, Validators.pattern(passwordPattern)])],
            confirmNewPassword: ['', Validators.required],
        })
    }

    submit() {
        this.formSubmitted.emit(this.form.value)
        this.buildForm()
    }

    isIncorrectPasswordFormat(control: string) {
        return this.form.get(control).hasError('incorrectPasswordFormat')
    }


    unSimilarPassword(controlStr: string) {
        const formControl = this.form.get(controlStr);
        return this.form.get('newPassword').value !== formControl.value && !formControl.pristine
    }


}
