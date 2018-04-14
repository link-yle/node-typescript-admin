import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-default-input-layout',
    templateUrl: 'default-input-layout.component.html',
    styleUrls: ['default-input-layout.component.scss']
})
export class DefaultInputLayoutComponent {
    @Input() errorMessage: string
    @Input() isNotValid: Boolean
    @Input() label: string
}
