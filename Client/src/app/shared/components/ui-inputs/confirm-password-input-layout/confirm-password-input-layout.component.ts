import { Component, Input } from '@angular/core';
import { unsimillarPasswordErrorMessage } from 'app/shared/config/constants';

@Component({
    selector: 'app-confirm-password-input-layout',
    templateUrl: 'confirm-password-input-layout.component.html',
})
export class ConfirmPasswordInputLayoutComponent {
    public errorMessage = unsimillarPasswordErrorMessage;
    @Input() isNotValid: Boolean
    @Input() label = 'Confirm Password'
}
