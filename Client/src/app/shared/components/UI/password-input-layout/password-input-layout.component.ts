import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-password-input-layout',
    templateUrl: 'password-input-layout.component.html',
})
export class PasswordInputlayoutComponent {
    @Input() isValid: Boolean
    @Input() label = 'Password'
}
