import {  $ } from 'protractor';

export class LoginPage {

    static login() {
        $('input[ng-reflect-name=email]').sendKeys('admin@test.com');
        $('input[ng-reflect-name=password]').sendKeys('1234567a');
        $('button[type=submit]').click()
    }
}


