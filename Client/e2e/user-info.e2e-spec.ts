import { CommonPage } from './common.po';
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
            Layout.usersTab.click()
        })

        fit('should update', () => {
            CommonPage.editIcons.first().click()
            InfoFormPage.clearFormName()
            const randomName: string = Math.random().toString(36).substring(7)
            InfoFormPage.submitForm(randomName)
            Layout.usersTab.click()
            // Layout
            // Layout.myProfileTab.click()

            // browser.sleep(50)
            // Layout.myTimingsTab.click()
            // browser.sleep(500)
            // const afterEditText = TimingsPage.lastRowCloumns.first().getText()
            // expect(afterEditText).toBe(randomName)
        })

    })


})
