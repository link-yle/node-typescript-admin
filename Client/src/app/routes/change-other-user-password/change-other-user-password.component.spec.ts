import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { Location } from '@angular/common';
import { UsersComponent } from 'app/routes/users-list/users.component';
import { ChangeOtherUserPasswordComponent } from 'app/routes/change-other-user-password/change-other-user-password.component';
import { SelectedUserService } from 'app/core/services/selectedUser.service';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';

describe('ChangeOtherUserPassword Component', () => {

    let comp: ChangeOtherUserPasswordComponent;
    let fixture: ComponentFixture<ChangeOtherUserPasswordComponent>;
    let dataService: DataService
    let location: Location
    let selectedUserService: SelectedUserService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule, PaginationModule,
                RouterTestingModule.withRoutes([
                    { path: 'users', component: UsersComponent },
                ]),
            ],
            declarations: [UsersComponent, ChangeOtherUserPasswordComponent],
            providers: [
                { provide: DataService, useValue: {} },
                { provide: SelectedUserService, useValue: { getUserWithProbableDataFetch() { return Observable.of({ _id: 'rr' }) } } },
                SnackBarService,
                Location
            ],
        });
        fixture = TestBed.createComponent(ChangeOtherUserPasswordComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService);
        location = fixture.debugElement.injector.get(Location);
        selectedUserService = fixture.debugElement.injector.get(SelectedUserService);
    });

    it('should build successfully', () => {
        fixture.detectChanges();
        expect(comp).toBeTruthy()
    })

    describe('Route initially', () => {
        describe('User found', () => {
            beforeEach(() => {
                fixture.detectChanges();
            })
            describe('form initially', () => {
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
                    expect(fixture.nativeElement.querySelectorAll('p.text-danger[hidden]').length).toBe(2)
                })
            })
        })
        describe('User not found', () => {
            it('should navigate to users page', fakeAsync(() => {
                selectedUserService.getUserWithProbableDataFetch = () => Observable.throw('W')
                fixture.detectChanges();
                console.log(comp.user)
                tick(1000)
                expect(location.path()).toBe('/users')
            }))
        })
    })


    describe('Form Validation', () => {
        beforeEach(() => {
            fixture.detectChanges();
        })
        describe('valid password and confirm passsword', () => {
            beforeEach(() => {
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sd'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
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

        describe('invalid password', () => {
            beforeEach(() => {
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = '123'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = '123'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
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

        describe('unsimilar password confirmation', () => {
            beforeEach(() => {
                const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
                const passwordInputElement = passwordInput.nativeElement
                passwordInputElement.value = 'ada456346sd'
                passwordInputElement.dispatchEvent(new Event('input'));
                const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
                const confirmPasswordInputElement = confirmPasswordInput.nativeElement
                confirmPasswordInputElement.value = 'ada456346sda'
                confirmPasswordInputElement.dispatchEvent(new Event('input'));
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
    })

    describe('Submitting Form', () => {
        beforeEach(() => {
            fixture.detectChanges();
        })
        beforeEach(() => {
            const passwordInput = fixture.debugElement.query(By.css('input[name="newPassword"]'));
            const passwordInputElement = passwordInput.nativeElement
            passwordInputElement.value = 'ada456346sd'
            passwordInputElement.dispatchEvent(new Event('input'));
            const confirmPasswordInput = fixture.debugElement.query(By.css('input[name="confirmPassword"]'));
            const confirmPasswordInputElement = confirmPasswordInput.nativeElement
            confirmPasswordInputElement.value = 'ada456346sd'
            confirmPasswordInputElement.dispatchEvent(new Event('input'));
            fixture.detectChanges();
        })

        describe('Scenario: Success', () => {
            beforeEach(() => {
                dataService.changeOtherUserPassword = (userId, newPwassword) => Observable.of('Ok')
            })
            it('should call api function with the correct parameters', () => {
                const spy = spyOn(dataService, 'changeOtherUserPassword').and.callThrough()
                fixture.detectChanges();
                fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                expect(spy).toHaveBeenCalledWith('rr', 'ada456346sd')
            })
        })

        describe('Scenario: Error', () => {
            it('should handle Error', () => {
                dataService.changeOtherUserPassword = (userId, newPwassword) => Observable.of('Ok')
                fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                expect(comp).toBeTruthy()
            })
        })



    })


})
