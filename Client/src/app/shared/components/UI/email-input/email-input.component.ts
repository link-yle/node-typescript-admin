import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-email-input',
    templateUrl: 'email-input.component.html',
})
export class EmailInputComponent {
    @Input() parentFormGroup: FormGroup
    @Input() isValidating: boolean
    isIncorrectMailFormat(control: string) {
        return this.parentFormGroup.get(control).hasError('incorrectMailFormat')
    }

}
