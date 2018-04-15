import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { PublicInfoService } from 'app/core/services/public.info.service';
import { Location } from '@angular/common';
// tslint:disable-next-line:max-line-length
import { NewPasswordAndRecoveryCodeSubmissionComponent } from 'app/routes/personal/recover-password-by-email/new-password-and-recovery-code-submission/new-password-and-recovery-code-submission.component';

describe('NewPasswordAndRecoveryCodeSubmission Component', () => {
    let comp: NewPasswordAndRecoveryCodeSubmissionComponent;
    let fixture: ComponentFixture<NewPasswordAndRecoveryCodeSubmissionComponent>;
    let dataService: DataService
    let location: Location
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                RouterTestingModule.withRoutes([
                    {
                        path: 'login/recover_password_by_email/submit_new_password/password_recovered_successfully',
                        component: NewPasswordAndRecoveryCodeSubmissionComponent
                    },
                ]),
            ],
            declarations: [NewPasswordAndRecoveryCodeSubmissionComponent, NewPasswordAndRecoveryCodeSubmissionComponent],
            providers: [
                { provide: DataService, useValue: {} },
                SnackBarService,
                PublicInfoService,
                Location
            ],
        })
        fixture = TestBed.createComponent(NewPasswordAndRecoveryCodeSubmissionComponent)
        comp = fixture.componentInstance
        dataService = fixture.debugElement.injector.get(DataService)
        location = fixture.debugElement.injector.get(Location)
        fixture.detectChanges()
    })

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Route initially', () => {
        it('form should exist', () => {
            expect(fixture.debugElement.query(By.css('button[type="submit"]'))).toBeTruthy()
        })
        it('should be invalid', () => {
            expect(comp.form.invalid).toBe(true)
        })
        it('submit button should be disabled', () => {
            expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
        })
        it('error messages should be hidden', () => {
            expect(fixture.nativeElement.querySelectorAll('p.text-danger[hidden]').length).toBe(4)
        })
    })


    describe('Form Validation', () => {
        describe('valid email, recovery code, password, and confirm passsword', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkds@sa.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
                const recoveryCodeElement = recoveryCode.nativeElement
                recoveryCodeElement.value = '11111111111111111111'
                recoveryCodeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            it('form should be valid', () => {
                expect(comp.form.invalid).toBe(false)
            })
            it('submit button should be enabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeFalsy()
                expect(fixture.nativeElement.querySelector('button[type="submit"]')).toBeTruthy()
            })
        })

        describe('invalid email', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkdscom'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
                const recoveryCodeElement = recoveryCode.nativeElement
                recoveryCodeElement.value = '11111111111111111111'
                recoveryCodeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('error message should appear', () => {
                fixture.detectChanges()
                const y = fixture.debugElement.queryAll(By.css('p.text-danger'));
                expect(y[0].nativeElement.innerHTML).toContain('Please Enter')
                expect(y[0].properties.hidden).toBeFalsy();
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })

        describe('invalid recoveryCode', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkds@sa.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
                const recoveryCodeElement = recoveryCode.nativeElement
                recoveryCodeElement.value = '11111111111'
                recoveryCodeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('error message should appear', () => {
                fixture.detectChanges()
                const y = fixture.debugElement.queryAll(By.css('p.text-danger'));
                expect(y[1].nativeElement.innerHTML).toContain('Please Enter')
                expect(y[1].properties.hidden).toBeFalsy();
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })


        describe('invalid password', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkds@sa.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = '123'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = '123'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
                const recoveryCodeElement = recoveryCode.nativeElement
                recoveryCodeElement.value = '11111111111111111111'
                recoveryCodeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('error message should appear', () => {
                fixture.detectChanges()
                const y = fixture.debugElement.queryAll(By.css('p.text-danger'));
                expect(y[2].nativeElement.innerHTML).toContain('Please Enter')
                expect(y[2].properties.hidden).toBeFalsy();
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })

        describe('invalid second password', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkds@sa.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd55555555554'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
                const recoveryCodeElement = recoveryCode.nativeElement
                recoveryCodeElement.value = '11111111111111111111'
                recoveryCodeElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            it('form should be invalid', () => {
                expect(comp.form.invalid).toBe(true)
            })
            it('error message should appear', () => {
                fixture.detectChanges()
                const y = fixture.debugElement.queryAll(By.css('p.text-danger'));
                expect(y[3].nativeElement.innerHTML).toContain('Please Enter')
                expect(y[3].properties.hidden).toBeFalsy();
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })
    })
    describe('Submitting Form', () => {
        beforeEach(() => {
            const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
            const emailInputElement = emailInput.nativeElement
            emailInputElement.value = 'aadsdjhkds@sa.com'
            emailInputElement.dispatchEvent(new Event('input'));
            const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
            const passwordInputElement = passwordInput.nativeElement
            passwordInputElement.value = 'ada456346sd'
            passwordInputElement.dispatchEvent(new Event('input'));
            const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
            const confirmPasswordInputElement = confirmPasswordInput.nativeElement
            confirmPasswordInputElement.value = 'ada456346sd'
            confirmPasswordInputElement.dispatchEvent(new Event('input'));
            const recoveryCode = fixture.debugElement.query(By.css('input[name="recoveryCode"]'));
            const recoveryCodeElement = recoveryCode.nativeElement
            recoveryCodeElement.value = '11111111111111111111'
            recoveryCodeElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
        })

        describe('Scenario: Success', () => {
            beforeEach(() => {
                dataService.changeMyPasswordUsingRecoveryCode = ({recoveryCode, newPassword, email}) => Observable.of('Ok')
            })
            it('should call api function with the correct parameters', () => {
                const spy = spyOn(dataService, 'changeMyPasswordUsingRecoveryCode').and.callThrough()
                fixture.detectChanges();
                fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                expect(spy).toHaveBeenCalledWith(Object({recoveryCode: '11111111111111111111', newPassword: 'ada456346sd', email: 'aadsdjhkds@sa.com'}))
            })
            it('should navigate to password submission route', fakeAsync(() => {
                fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                tick(400)
                expect(location.path()).toBe('/login/recover_password_by_email/submit_new_password/password_recovered_successfully')
            }))
        })

        describe('Scenario: Error', () => {
            it('should handle Error', () => {
                dataService.changeMyPasswordUsingRecoveryCode = ({recoveryCode, newPassword, email}) => Observable.throw('EE')
                fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                expect(comp).toBeTruthy()
            })
        })
    })
})
