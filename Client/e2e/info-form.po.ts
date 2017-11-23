import { $ } from 'protractor';

export class InfoFormPage {

    static submitForm(name: string) {
        $('input[formControlName=name]').sendKeys(name);
        $('button[type=submit]').click()
    }

    static clearFormName() {
        $('input[formControlName=name]').clear()
    }
}


