import { $ } from 'protractor';

export class InfoFormPage {

    static nameValue =  () => $('input[ng-reflect-name=name]').getAttribute('value')
    static submitForm(name: string) {
        $('input[formControlName=name]').sendKeys(name);
        $('button[type=submit]').click()
    }

    static clearFormName() {
        $('input[formControlName=name]').clear()
    }
}


