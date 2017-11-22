import { $ } from 'protractor';

export class TimeFormPage {

    static submitForm(name: string, city: string, gmtTimeDiference: number) {
        $('input[formControlName=name]').sendKeys(name);
        $('input[formControlName=city]').sendKeys(city);
        $('input[formControlName=gmtTimeDifference]').sendKeys(gmtTimeDiference);
        $('button[type=submit]').click()
    }

    static clearForm() {
        $('input[formControlName=name]').clear()
        $('input[formControlName=city]').clear()
        $('input[formControlName=gmtTimeDifference]').clear()
        $('button[type=submit]').click()
    }
}


