import { $, $$ } from 'protractor';

export class TimingsPage {

    static plusIcon = $('.fa-plus')
    static lastRowCloumns = $$('tr').last().$$('td')

    static deleteLastElement() {
        $$('tr').last().$$('td').last().click()
    }

    static goToEditLastElement () {
        $$('.fa-edit').last().click()
    }

}


