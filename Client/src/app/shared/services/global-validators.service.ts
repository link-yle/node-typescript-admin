import { Injectable } from '@angular/core';

@Injectable()

export class GlobalValidators {
    static mailFormat(control): ValidationResult {
        const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        if (control.value && control.value !== '' && (control.value.length <= 5 || !EMAIL_REGEXP.test(control.value))) {
            return { 'incorrectMailFormat': true };
        }
        return null;
    }
    static passwordFormat(control): ValidationResult {
        const REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (control.value && control.value !== '' &&  !REGEX.test(control.value)) {
            return { 'incorrectPasswordFormat': true };
        }
        return null;
    }


}

