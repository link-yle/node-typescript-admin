import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-custom-input',
    templateUrl: 'custom-input.component.html',
})
export class CustomInputComponent {
    @Input() parentFormGroup: FormGroup
    @Input() isValidating: boolean
    @Input() label: string
    @Input() formControlNameInput
    @Input() type: string
    @Input() pH: string
    @Input() errMsg: string
    @Input() validationFn
}
