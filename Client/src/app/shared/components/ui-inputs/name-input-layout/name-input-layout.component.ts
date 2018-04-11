import { Component, Input } from '@angular/core';
import { nameErrorMessage } from 'app/shared/config/constants';

@Component({
    selector: 'app-name-input-layout',
    templateUrl: 'name-input-layout.component.html',
})
export class NameInputLayoutComponent {
    public errorMessage = nameErrorMessage
    @Input() isNotValid: Boolean
}
