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
import { MyTimeComponent } from 'app/routes/personal/my-time/my-time.component';
import { UsersComponent } from 'app/routes/users-list/users.component';
import { SelectedUserService } from 'app/core/services/selectedUser.service';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { OtherUserTimeComponent } from 'app/routes/other-user-time/other-user-time.component';
import { mock } from 'ts-mockito';
import { User } from 'app/shared/models/user.model';
import { TimingsService } from 'app/core/services/timings.service';
import { EditOtherUserTimeComponent } from 'app/routes/edit-other-user-time/edit-other-user-time.component';

describe('EditOtherUserTime Component', () => {
    let comp: EditOtherUserTimeComponent;
    let fixture: ComponentFixture<EditOtherUserTimeComponent>;
    let location: Location
    let dataService: DataService
    let selectedUserService: SelectedUserService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule, PaginationModule,
                RouterTestingModule.withRoutes([
                    { path: 'users/:id/time', component: OtherUserTimeComponent },
                    { path: 'users', component: UsersComponent }
                ]),
            ],
            declarations: [EditOtherUserTimeComponent, UsersComponent, OtherUserTimeComponent],
            providers: [
                { provide: SelectedUserService, useValue: {} },
                { provide: DataService, useValue: {} },
                { provide: TimingsService, useValue: { getSelectedTiming() { return {_id: 'ww'} } } },
                SnackBarService,
            ],
        });
        fixture = TestBed.createComponent(EditOtherUserTimeComponent);
        comp = fixture.componentInstance;
        location = fixture.debugElement.injector.get(Location);
        dataService = fixture.debugElement.injector.get(DataService)
        selectedUserService = fixture.debugElement.injector.get(SelectedUserService)
    });

    describe('no user available', () => {
        beforeEach(() => {
            selectedUserService.getUserWithProbableDataFetch = () => Observable.of(null)
        })
        it('should build successfully', () => {
            fixture.detectChanges();
            expect(comp).toBeTruthy()
        })
        it('should navigate to "users" route', fakeAsync(() => {
            fixture.detectChanges();
            tick()
            expect(location.path()).toBe('/users')
        }))
    })

    describe('user available', () => {
        beforeEach(() => {
            const u = mock(User)
            u._id = 'rr'
            selectedUserService.getUserWithProbableDataFetch = () => Observable.of(u)
            fixture.detectChanges()
        })
        describe('Submitting Form', () => {
            beforeEach(() => {
                const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
                const nameInputElement = nameInput.nativeElement
                nameInputElement.value = 'nnnn'
                nameInputElement.dispatchEvent(new Event('input'));
                const city = fixture.debugElement.query(By.css('input[name="city"]'));
                const cityElement = city.nativeElement
                cityElement.value = 'cccc'
                cityElement.dispatchEvent(new Event('input'));
                const gmtTimeDifference = fixture.debugElement.query(By.css('input[name="gmtTimeDifference"]'));
                const gmtTimeDifferenceElement = gmtTimeDifference.nativeElement
                gmtTimeDifferenceElement.value = '3'
                gmtTimeDifferenceElement.dispatchEvent(new Event('input'));
                fixture.detectChanges();
            })
            describe('Success Scenario', () => {
                beforeEach(() => {
                    dataService.updateTimeZone = (id, payload) => Observable.of('ok')
                })
                describe('api call', () => {
                    let spy
                    beforeEach(() => {
                        spy = spyOn(dataService, 'updateTimeZone').and.callThrough()
                    })
                    it('should successfully post', () => {
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                        expect(spy).toHaveBeenCalled();
                    })
                    it('should call with right arguments', () => {
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                        expect(spy).toHaveBeenCalledWith('rr', 'ww' , Object({ name: 'nnnn', city: 'cccc', gmtTimeDifference: 3 }));
                    })
                })

                it('should navigate to "users/:id/time" route', fakeAsync(() => {
                    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                    tick(100)
                    expect(location.path()).toBe('/users/rr/time')
                }))

            })
            describe('Error Scenario', () => {
                beforeEach(() => {
                    dataService.updateTimeZone = (id, payload) => Observable.throw('Error')
                    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                })
                it('should handle error', () => {
                    expect(comp).toBeTruthy();
                })
            })
        })
    })
})
