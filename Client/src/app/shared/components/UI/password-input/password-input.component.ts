import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-password-input',
    templateUrl: 'password-input.component.html',
})
export class PasswordInputComponent {
    @Input() parentFormGroup: FormGroup
    @Input() isValidating: boolean

    isIncorrectPasswordFormat(control: string) {
        return this.parentFormGroup.get(control).hasError('incorrectPasswordFormat')
    }

}
