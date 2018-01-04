import { Injectable } from '@angular/core';
import * as Joi from 'joi';

@Injectable()

export class GlobalValidatorsService {
    mailFormat(control) {
        if ( control.value !== '' && Joi.validate(control.value, Joi.string().email()).error ) {
            return { 'incorrectMailFormat': true }
        } else return null;
    }
    passwordFormat(control) {
        const REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (control.value !== '' && Joi.validate(control.value, Joi.string().regex(REGEX)).error) {
            return { 'incorrectPasswordFormat': true };
        } else return null;
    }

    nameFormat(control) {
        if (control.value !== '' && Joi.validate(control.value, Joi.string().min(3).max(20)).error) {
            return { 'incorrectNameFormat': true };
        } else return null;
    }

    activationCodeFormat(control) {
        if ( control.value !== '' && Joi.validate(control.value, Joi.string().length(20)).error ) {
            return { 'incorrectCodeFormat': true }
        } else return null;
    }

}

