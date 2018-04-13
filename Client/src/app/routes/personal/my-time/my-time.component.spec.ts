import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { AuthService } from 'app/core/services/auth.service';
import { By } from '@angular/platform-browser';
import { SignupComponent } from 'app/routes/signup/signup.component';
import { RecoverPasswordByEmailComponent } from 'app/routes/personal/recover-password-by-email/recover-password-by-email.component.';
import { EmptyComponent } from 'app/routes/empty/empty.component';
import { Location } from '@angular/common';
import { mock } from 'ts-mockito';
import { MyTimeComponent } from 'app/routes/personal/my-time/my-time.component';
import { EditMyTimeComponent } from 'app/routes/personal/edit-my-time/edit-my-time.component';
import { AddMyTimeComponent } from 'app/routes/personal/add-my-time/add-my-time.component';
import { TimingsService } from 'app/core/services/timings.service';

fdescribe('MyTime Component', () => {
    let comp: MyTimeComponent;
    let fixture: ComponentFixture<MyTimeComponent>;
    let location: Location
    let dataService: DataService

    const dataServiceStub = {
        getUserDetails() {
            return Observable.of({
                _id: 'uID',
                name: 'W',
                email: 'assad@sjdeir.com',
                timeZones: [
                    {
                        _id: 'r',
                        city: 'Cairo',
                        name: 'C',
                        gmtTimeDifference: 3
                    }
                ]
            })
        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: 'my-time/edit', component: EditMyTimeComponent },
                    { path: 'my-time/add', component: AddMyTimeComponent },
                ]),
                SharedModule
            ],
            declarations: [MyTimeComponent, AddMyTimeComponent, EditMyTimeComponent],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                SnackBarService,
                AuthService,
                TimingsService,
                Location
            ],
        });
        fixture = TestBed.createComponent(MyTimeComponent);
        comp = fixture.componentInstance;
        dataService = fixture.debugElement.injector.get(DataService);
        location = fixture.debugElement.injector.get(Location);
        fixture.detectChanges();
    });

    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })

    describe('Initial Markup', () => {
        it('Name should be displayed', () => {
            expect(fixture.nativeElement.querySelectorAll('td')[0].innerHTML).toBe('C')
        })
        it('City should be displayed', () => {
            expect(fixture.nativeElement.querySelectorAll('td')[1].innerHTML).toBe('Cairo')
        })
        it('Gmt time difference should be displayed', () => {
            expect(fixture.nativeElement.querySelectorAll('td')[3].innerHTML).toBe('3')
        })
        it('clock should be displayed', () => {
            expect(fixture.nativeElement.querySelectorAll('td')[2].innerHTML).toBeTruthy();
            expect(fixture.nativeElement.querySelectorAll('td')[2].innerHTML).toContain(':');
        })
    })

    describe('Delete timezone', () => {
        describe('success', () => {
            it('list item should be removed', () => {
                expect(fixture.nativeElement.querySelectorAll('td')[3]).toBeTruthy()
                dataService.deleteTimeZone = () => Observable.of('ok')
                fixture.nativeElement.querySelector('.fa-trash').click()
                fixture.detectChanges()
                expect(fixture.nativeElement.querySelectorAll('td')[3]).toBeFalsy()
            });
            it('api service should have been called with correct params', () => {
                dataService.deleteTimeZone = () => Observable.of('ok')
                const spy = spyOn(dataService, 'deleteTimeZone').and.callThrough()
                fixture.nativeElement.querySelector('.fa-trash').click()
                fixture.detectChanges()
                expect(spy).toHaveBeenCalledWith('uID', 'r')
            });
        })

        describe('error', () => {
            it('list item should not be removed', () => {
                expect(fixture.nativeElement.querySelectorAll('td')[3]).toBeTruthy()
                dataService.deleteTimeZone = () => Observable.throw('Error')
                fixture.nativeElement.querySelector('.fa-trash').click()
                fixture.detectChanges()
                expect(fixture.nativeElement.querySelectorAll('td')[3]).toBeTruthy()
            });
        })
    })

    describe('Navigation', () => {
        describe('click on plus button', () => {
            it('should navigate to correct add new time route', fakeAsync(() => {
                fixture.nativeElement.querySelector('.fa-plus').click();
                tick();
                fixture.detectChanges();
                expect(location.path()).toBe('/my-time/add');
            }));
        })
        describe('click on plus edit button', () => {
            it('should navigate to correct edit time route', fakeAsync(() => {
                fixture.nativeElement.querySelector('.fa-edit').click();
                tick();
                fixture.detectChanges();
                expect(location.path()).toBe('/my-time/edit');
            }));
        })
    })


})
