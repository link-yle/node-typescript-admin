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
import { EditMyTimeComponent } from 'app/routes/personal/edit-my-time/edit-my-time.component';
import { TimingsService } from 'app/core/services/timings.service';


describe('EditMyTime Component', () => {
    let comp: EditMyTimeComponent;
    let fixture: ComponentFixture<EditMyTimeComponent>;
    let location: Location
    let authService: AuthService
    let timingsService: TimingsService
    let dataService: DataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule,
                RouterTestingModule.withRoutes([
                    { path: 'my-time', component: MyTimeComponent }
                ]),
            ],
            declarations: [EditMyTimeComponent, MyTimeComponent],
            providers: [
                { provide: AuthService, useValue: { getId() { return 'iiid' } } },
                { provide: DataService, useValue: {} },
                { provide: TimingsService, useValue: {} },
                SnackBarService,

            ],
        });
        fixture = TestBed.createComponent(EditMyTimeComponent);
        comp = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        location = fixture.debugElement.injector.get(Location);
        dataService = fixture.debugElement.injector.get(DataService)
        timingsService = fixture.debugElement.injector.get(TimingsService)
    });
    it('should build successfully', () => {
        expect(comp).toBeTruthy()
    })
    describe('No timing has been selected', () => {
        it('should navigate to "my-time" route', fakeAsync(() => {
            timingsService.getSelectedTiming = () => null
            fixture.detectChanges();
            tick(100)
            expect(location.path()).toBe('/my-time')
        }))
    })

    describe('Timing has been selected', () => {
        beforeEach(() => {
            timingsService.getSelectedTiming = () => ({ _id: 'rr', name: 'tttttt', city: 'vvvvvvv', gmtTimeDifference: 9 })
            fixture.detectChanges();
        })
        it('should build successfully', () => {
            expect(comp).toBeTruthy()
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
                fixture.detectChanges()
            })

            describe('Add my time endpoint', () => {
                describe('Success Scenario', () => {
                    beforeEach(() => {
                        dataService.updateTimeZone = (id, payload) => Observable.of('ok')
                    })
                    describe('api call', () => {
                        let spy;
                        beforeEach(() => {
                            spy = spyOn(dataService, 'updateTimeZone').and.callThrough()
                            fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                        })
                        it('should successfully post', () => {
                            expect(spy).toHaveBeenCalled();
                        })
                        it('should call with right arguments', () => {
                            expect(spy).toHaveBeenCalledWith('iiid', 'rr', Object({ name: 'nnnn', city: 'cccc', gmtTimeDifference: 3 }));
                        })
                    })
                    it('should navigate to "my-time" route', fakeAsync(() => {
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                        tick(100)
                        expect(location.path()).toBe('/my-time')
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
})
