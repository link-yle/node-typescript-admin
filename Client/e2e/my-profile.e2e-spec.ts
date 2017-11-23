import { browser, $$, $, } from 'protractor';
import { LoginPage } from './login.po';
import { Layout } from './layout.po';
import { InfoFormPage } from './info-form.po';

describe('My Profile', () => {

    beforeAll(() => {
        browser.get('/login');
        LoginPage.login()
    });

    describe('Profile', () => {
        beforeEach(() => {
            Layout.myProfileTab.click()
        })

        it('should update', () => {
            InfoFormPage.clearFormName()
            const randomName: string = Math.random().toString(36).substring(7)
            InfoFormPage.submitForm(randomName)
            Layout.myTimingsTab.click()
            Layout.myProfileTab.click()
            const text = $('input[formControlName=name]').getInnerHtml()
            expect(text).toBe(randomName)
            // Layout.myTimingsTab.click()
            // browser.sleep(500)
            // const afterEditText = TimingsPage.lastRowCloumns.first().getText()
            // expect(afterEditText).toBe(randomName)
        })

    })


})
