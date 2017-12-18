import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-submit-button',
    templateUrl: 'submit-button.component.html',
})
export class SubmitButtonComponent {
    @Input() isDisabled: boolean
}
