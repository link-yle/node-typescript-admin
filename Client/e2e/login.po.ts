import {  $ } from 'protractor';

export class LoginPage {

    static login() {
        $('input[formControlName=email]').sendKeys('admin@test.com');
        $('input[formControlName=password]').sendKeys('1234567a');
        $('button[type=submit]').click()
    }
}


