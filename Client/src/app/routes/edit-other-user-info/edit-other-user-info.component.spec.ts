import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { Location } from '@angular/common';
import { AuthService } from 'app/core/services/auth.service';
import { EditUserComponent } from 'app/shared/components/users/edit-user/edit-user.component';
import { ChangeMyPasswordUsingOldPasswordComponent } from 'app/routes/personal/edit-my-info/change-my-password-using-old-password/change-my-password-using-old-password.component';
import { EditOtherUserInfoComponent } from 'app/routes/edit-other-user-info/edit-other-user-info.component';
import { ChangeOtherUserPasswordComponent } from 'app/routes/change-other-user-password/change-other-user-password.component';
import { SelectedUserService } from 'app/core/services/selectedUser.service';

describe('EditOtherUserInfo Component', () => {
    let comp: EditOtherUserInfoComponent;
    let fixture: ComponentFixture<EditOtherUserInfoComponent>;
    let location: Location
    let selectedUserService
    let dataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule,
                RouterTestingModule.withRoutes([
                    { path: 'users/:id/password', component: ChangeOtherUserPasswordComponent }
                ]),
            ],
            declarations: [EditOtherUserInfoComponent, ChangeOtherUserPasswordComponent],
            providers: [
                { provide: SelectedUserService, useValue: { getUserWithProbableDataFetch(a) { return Observable.of({ _id: 'rr', name: 'aaaa', email: 'aadr@rsde.com' })} } },
                { provide: DataService, useValue: {} },
                SnackBarService,
                AuthService
            ],
        });
        fixture = TestBed.createComponent(EditOtherUserInfoComponent);
        comp = fixture.componentInstance;
        selectedUserService = fixture.debugElement.injector.get(AuthService);
        location = fixture.debugElement.injector.get(Location);
        dataService = fixture.debugElement.injector.get(DataService)
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Navigation', () => {
        it('Change my password should navigate to the right page with the user id in the route params', fakeAsync(() => {
            fixture.nativeElement.querySelector('#change-user-password-button').click()
            tick()
            expect(location.path()).toBe('/users/rr/password')
        }))
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

        describe('Edit other user info endpoint', () => {
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
                expect(spy).toHaveBeenCalledWith('rr', Object({ name: 'YYYY', email: 'aadsdjhk@daom.com' }));
            })
        })
    })


})
