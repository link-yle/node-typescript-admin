import { Component, Input } from '@angular/core';
import { codeErrorMessage } from 'app/shared/config/constants';

@Component({
    selector: 'app-code-input-layout',
    templateUrl: 'code-input-layout.component.html',
    styleUrls: ['code-input-layout.component.scss']
})
export class CodeInputLayoutComponent {
    public errorMessage = codeErrorMessage;
    @Input() isNotValid: Boolean
    @Input() label = 'Recovery Code'
}
