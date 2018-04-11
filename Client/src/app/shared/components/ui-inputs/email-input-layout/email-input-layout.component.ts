import { Component, Input } from '@angular/core';
import { emailErrorMessage } from 'app/shared/config/constants';

@Component({
    selector: 'app-email-input-layout',
    templateUrl: 'email-input-layout.component.html',
})
export class EmailInputLayoutComponent {
    public errorMessage = emailErrorMessage;
    @Input() isNotValid: Boolean

}
