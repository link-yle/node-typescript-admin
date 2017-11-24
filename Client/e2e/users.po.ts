import { $, $$ } from 'protractor';

export class UsersPage {

    static nameOfLastUser = $$('tr').last().$$('td').first().getText()

}


