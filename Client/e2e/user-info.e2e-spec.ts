import { CommonPage } from './common.po';
import { browser, $$, $, } from 'protractor';
import { LoginPage } from './login.po';
import { Layout } from './layout.po';
import { InfoFormPage } from './info-form.po';
import { UsersPage } from './users.po';

describe('Other User Info', () => {

    beforeAll(() => {
        browser.get('/login');
        LoginPage.login()
    });

    describe('Update', () => {
        beforeEach(() => {
            Layout.usersTab().click()
        })

        it('should update', () => {
            const nameOfLastUserBeforeUpdate = UsersPage.nameOfLastUser()
            CommonPage.editIcons().last().click()
            InfoFormPage.clearFormName()
            const randomName: string = Math.random().toString(36).substring(7)
            InfoFormPage.submitForm(randomName)
            Layout.usersTab().click()
            const nameOfLastUserAfterUpdate = UsersPage.nameOfLastUser()
            expect(nameOfLastUserAfterUpdate).toBe(randomName)
            expect(nameOfLastUserAfterUpdate).not.toBe(nameOfLastUserBeforeUpdate)
        })

    })


})
