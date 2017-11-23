import { $, $$ } from 'protractor';

export class CommonPage {
    static plusIcon = $('.fa-plus')
    static editIcons = $$('.fa-edit')
    static lastRowCloumns = $$('tr').last().$$('td')
}
