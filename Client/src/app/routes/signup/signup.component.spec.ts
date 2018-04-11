import { SignupModule } from './signup.module';
import { SignupComponent } from './signup.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { NameInputLayoutComponent } from 'app/shared/components/ui-inputs/name-input-layout/name-input-layout.component';
import { PublicInfoService } from 'app/core/services/public.info.service';

fdescribe('Signup Component', () => {

    let comp: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let sb: SnackBarService

    const user = {
        name: 'Ahmed',
        password: '454565',
        email: 'sads@ewew.com'

    }

    const dataServiceStub = {
        signUp(data) {
            return Observable.of(data)
        },
        login(data) {
            return Observable.of(data)
        }
    }
    let dataService: DataService
    const SnackBarServiceStub = {
        emitSuccessSnackBar(message) {

        },
        emitErrorSnackBar(message) {

        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [SignupComponent],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
                { provide: PublicInfoService, useValue: {} }
            ],
        });
        fixture = TestBed.createComponent(SignupComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Initial markup', () => {
        describe('Form Validation', () => {
            describe('form initially', () => {
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
        })
    })

    describe('Form Validation', () => {
        describe('valid email, password, confirm passsword, and name', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkds@sa.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="oldPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YYYY'
                nameElement.dispatchEvent(new Event('input'));
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

        describe('invalid name', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjh@kdaom.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="oldPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YY'
                nameElement.dispatchEvent(new Event('input'));
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

        describe('invalid email', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhkdaom'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="oldPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YYYY'
                nameElement.dispatchEvent(new Event('input'));
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
                emailInputElement.value = 'aadsdjhk@daom.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="oldPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = '23'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = '23'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YYYY'
                nameElement.dispatchEvent(new Event('input'));
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
                emailInputElement.value = 'aadsdjhk@daom.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const passwordInput = fixture.debugElement.query(By.css('input[name="oldPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = '22323435fgt3'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = '22323435fgt34'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YYYY'
                nameElement.dispatchEvent(new Event('input'));
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
        describe('Scenario: posting new', () => {
            beforeEach(() => {

            })
            describe('Scenario: Success', () => {
                beforeEach(() => {
                    dataService.signup = (data) => Observable.of(user)
                    comp.signup()
                })
                it('should successfully post', () => {
                    expect(comp).toBeTruthy()
                })
            })


            describe('Scenario: Error', () => {
                beforeEach(() => {
                    dataService.signup = (data) => Observable.throw('Error')
                    comp.signup()
                })
                it('should respond to error', () => {
                    expect(comp).toBeTruthy()
                })
            })
        })

    })


})
