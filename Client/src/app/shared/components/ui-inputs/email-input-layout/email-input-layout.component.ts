import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-email-input-layout',
    templateUrl: 'email-input-layout.component.html',
})
export class EmailInputLayoutComponent {
    @Input() isValid: Boolean

}
