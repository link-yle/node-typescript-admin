import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-name-input-layout',
    templateUrl: 'name-input-layout.component.html',
})
export class NameInputLayoutComponent {
    @Input() isValid: Boolean
}
