import { setTimeout } from 'timers';
import { browser, element, by, ElementFinder, ElementArrayFinder, Key, ExpectedConditions, $$, $, until } from 'protractor';
import { TimeFormPage } from './time-form.po'
import { LoginPage } from './login.po';
import { Layout } from './layout.po';
import { TimingsPage } from './timings.po';

describe('Time', () => {

    beforeAll(() => {
        browser.get('/login');
        LoginPage.login()
    });

    describe('Timing', () => {
        beforeEach(() => {
            Layout.myTimingsTab.click()
        })
        it('should add', () => {
            TimingsPage.plusIcon.click()
            TimeFormPage.submitForm('NN', 'CN', 5)
            browser.sleep(500)
            const t = TimingsPage.lastRowCloumns.first().getText()
            expect(t).toBe('NN')
        })

        it('should update', () => {
            TimingsPage.goToEditLastElement()
            const randomName: string = Math.random().toString(36).substring(7)
            TimeFormPage.clearForm()
            TimeFormPage.submitForm(randomName, 'CF', 3)
            browser.sleep(50)
            Layout.myTimingsTab.click()
            browser.sleep(500)
            const afterEditText = TimingsPage.lastRowCloumns.first().getText()
            expect(afterEditText).toBe(randomName)
        })

        it('should delete', () => {
            const beforeDeleteText = TimingsPage.lastRowCloumns.first().getText()
            TimingsPage.deleteLastElement()
            browser.sleep(200)
            const afterDeleteText = TimingsPage.lastRowCloumns.first().getText()
            expect(beforeDeleteText).not.toBe(afterDeleteText)
        })

    })


})
