import { $, $$ } from 'protractor';

export class TimingsPage {


    static deleteLastElement() {
        $$('tr').last().$$('td').last().click()
    }

    static goToEditLastElement () {
        $$('.fa-edit').last().click()
    }

}


