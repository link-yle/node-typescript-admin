import { Component, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalValidatorsService } from 'app/shared/services/global-validators.service';
import { EventEmitter } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-new-password-form',
    templateUrl: 'new-password-form.component.html',
})
export class NewPasswordFormComponent implements OnInit{

    @Output() formSubmitted = new EventEmitter
    form: FormGroup

    constructor(
        private fb: FormBuilder,
        private globalValidatorsService: GlobalValidatorsService,
    ) {  }

    ngOnInit() {
        this.buildForm()
    }

    private buildForm() {
        this.form = this.fb.group({
            newPassword: ['', Validators.compose([Validators.required, this.globalValidatorsService.passwordFormat])],
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
