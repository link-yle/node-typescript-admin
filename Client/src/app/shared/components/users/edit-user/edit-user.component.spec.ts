import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { EditUserComponent } from 'app/shared/components/users/edit-user/edit-user.component';

describe('EditUser Component', () => {

    let comp: EditUserComponent;
    let fixture: ComponentFixture<EditUserComponent>;
    let dataService: any
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [],
            providers: [
                { provide: DataService, useValue: {} },
                SnackBarService
            ],
        });
        fixture = TestBed.createComponent(EditUserComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService)
        comp.user = { name: 'Wfaa', email: 'djakls@jk.com', password: 'daaerio7873', _id: 'aa' }
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Initial markup', () => {
        describe('Form Validation', () => {
            describe('form initially', () => {
                it('form should be valid', () => {
                    expect(comp.form.invalid).toBe(false)
                })
                it('submit button should be enabled', () => {
                    expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeFalsy()
                    expect(fixture.nativeElement.querySelector('button[type="submit"]')).toBeTruthy()
                })
            })
        })
    })

    describe('Form Validation', () => {
        describe('invalid name', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjh@kdaom.com'
                emailInputElement.dispatchEvent(new Event('input'));
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
                const y = fixture.debugElement.queryAll(By.css('p[test-id="errorMessage"]'));
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
                const y = fixture.debugElement.queryAll(By.css('p[test-id="errorMessage"]'));
                expect(y[1].nativeElement.innerHTML).toContain('Please Enter')
                expect(y[1].properties.hidden).toBeFalsy();
            })
            it('submit button should be disabled', () => {
                expect(fixture.nativeElement.querySelector('button[type="submit"][disabled]')).toBeTruthy()
            })
        })


        describe('Submitting Form', () => {
            beforeEach(() => {
                const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
                const emailInputElement = emailInput.nativeElement
                emailInputElement.value = 'aadsdjhk@daom.com'
                emailInputElement.dispatchEvent(new Event('input'));
                const name = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameElement = name.nativeElement
                nameElement.value = 'YYYY'
                nameElement.dispatchEvent(new Event('input'));
            })

            describe('EditUser', () => {
                describe('Scenario: Success', () => {
                    let spy;
                    beforeEach(() => {
                        dataService.updateUserInfo = (id, payload) => Observable.of('ok')
                        spy = spyOn(dataService, 'updateUserInfo').and.callFake((id, payload) => Observable.of('ok'))
                        fixture.detectChanges();
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                    })
                    it('should successfully post', () => {
                        expect(spy).toHaveBeenCalled();
                    })

                    it('should call with right arguments', () => {
                        expect(spy).toHaveBeenCalledWith('aa', Object({ name: 'YYYY', email: 'aadsdjhk@daom.com' }));
                    })
                })

                describe('Scenario: Error', () => {
                    beforeEach(() => {
                        const err = {
                            status: 400,
                            json() { return { error: 'thats an error' } }
                        }
                        dataService.EditUser = (data) => Observable.throw(err)
                        fixture.detectChanges();
                    })
                    it('should handle error', () => {
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                        fixture.detectChanges();
                    })
                })
            })

        })


    })
})
