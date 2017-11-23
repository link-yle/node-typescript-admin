import {  element, by, $, $$} from 'protractor';

export class Layout {
    static myTimingsTab = $$('li').first()
    static myProfileTab = element(by.cssContainingText('a', 'My profile'));
    static usersTab = element(by.cssContainingText('a', 'Users'));
}


