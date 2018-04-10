import { Injectable } from '@angular/core';

@Injectable()

export class GlobalValidatorsService {
    passwordFormat(control) {
        const REGEX = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
        if (control.value !== '' && !REGEX.test(control.value)) {
            return { 'incorrectPasswordFormat': true };
        } else return null;
    }

    nameFormat(control) {
        if (control.value !== '' && !(control.value.length >= 3 && control.value.length <= 20)) {
            return { 'incorrectNameFormat': true };
        } else return null;
    }


}

