import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { LoginComponent } from 'app/routes/personal/login/login.component';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { AuthService } from 'app/core/services/auth.service';
import { By } from '@angular/platform-browser';

fdescribe('Home Component', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let sb: SnackBarService

    const user = {
        name: 'Ahmed'
    }

    const dataServiceStub = {
        login(data) {
            return Observable.of(user)
        }
    }
    let dataService: DataService
    const SnackBarServiceStub = {
        emitSuccessSnackBar(message) {

        },
        emitErrorSnackBar(message) {

        }
    }

    const authServiceStub = {
        saveToken(token) { },
        saveProfile(user) { }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [LoginComponent],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
                { provide: AuthService, useValue: authServiceStub }
            ],
        });
        fixture = TestBed.createComponent(LoginComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Form Validation', () => {
            describe('form initially', () => {
                it('should be invalid', () => {
                    expect(comp.form.invalid).toBe(true)
                })
                it('submit button should be disabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
                })
                it('error messages should be hidden', () => {
                    expect(fixture.nativeElement.querySelectorAll('p.text-danger[hidden]').length).toBe(2)
                })
            })

            describe('valid email and password', () => {
                beforeEach(() => {
                    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                    const emailInputElement = emailInput.nativeElement
                    emailInputElement.value = 'aadsdjhkds@sa.com'
                    emailInputElement.dispatchEvent(new Event('input'));
                    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
                    const passwordInputElement = passwordInput.nativeElement
                    passwordInputElement.value = 'ada456346sd'
                    passwordInputElement.dispatchEvent(new Event('input'));
                    fixture.detectChanges();
                })
                it('form should be valid', () => {
                    expect(comp.form.invalid).toBe(false)
                })
                it('submit button should be enabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeFalsy()
                })
            })

            describe('form with unvalid email', () => {
                beforeEach(() => {
                    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                    const emailInputElement = emailInput.nativeElement
                    emailInputElement.value = 'aadsdjhkdscom'
                    emailInputElement.dispatchEvent(new Event('input'));
                    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
                    const passwordInputElement = passwordInput.nativeElement
                    passwordInputElement.value = 'ada456346sd'
                    passwordInputElement.dispatchEvent(new Event('input'));
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

            describe('form with unvalid password', () => {
                beforeEach(() => {
                    const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                    const emailInputElement = emailInput.nativeElement
                    emailInputElement.value = 'aadsdjhkds@sa.com'
                    emailInputElement.dispatchEvent(new Event('input'));
                    const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
                    const passwordInputElement = passwordInput.nativeElement
                    passwordInputElement.value = 'add'
                    passwordInputElement.dispatchEvent(new Event('input'));
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

            it('aa', () => {
                // fixture.nativeElement.querySelector('input[type="email"]').value = 'aadsd@jhkds.com'
                // fixture.nativeElement.querySelector('input[type="password"]').value = '8572349857je'

                comp.form.controls['email'].setValue('aadsd@jhkds.com');
                comp.form.controls['password'].setValue('8572349857je');
                fixture.detectChanges();
                const len = fixture.nativeElement.querySelectorAll('p.text-danger[hidden]').length
                console.log(len)

            })
            // describe('Scenario: Success', () => {
            //     beforeEach(() => {
            //         dataService.signup = (data) => Observable.of(user)
            //         comp.onSubmit(user)
            //     })
            //     it('should successfully post', () => {
            //         expect(comp).toBeTruthy()
            //     })
            // })


            // describe('Scenario: Error', () => {
            //     beforeEach(() => {
            //         dataService.signup = (data) => Observable.throw('Error')
            //         comp.onSubmit(user)
            //     })
            //     it('should respond to error', () => {
            //         expect(comp).toBeTruthy()
            //     })
            // })

    })


    // describe('Submitting Form', () => {
    //     describe('Scenario: posting new', () => {
    //         beforeEach(() => {

    //         })
    //         describe('Scenario: Success', () => {
    //             beforeEach(() => {
    //                 dataService.signup = (data) => Observable.of(user)
    //                 comp.onSubmit(user)
    //             })
    //             it('should successfully post', () => {
    //                 expect(comp).toBeTruthy()
    //             })
    //         })


    //         describe('Scenario: Error', () => {
    //             beforeEach(() => {
    //                 dataService.signup = (data) => Observable.throw('Error')
    //                 comp.onSubmit(user)
    //             })
    //             it('should respond to error', () => {
    //                 expect(comp).toBeTruthy()
    //             })
    //         })
    //     })

    // })


})
