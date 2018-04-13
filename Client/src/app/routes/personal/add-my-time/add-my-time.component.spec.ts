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
import { AddMyTimeComponent } from 'app/routes/personal/add-my-time/add-my-time.component';
import { MyTimeComponent } from 'app/routes/personal/my-time/my-time.component';


describe('AddMyTime Component', () => {
    let comp: AddMyTimeComponent;
    let fixture: ComponentFixture<AddMyTimeComponent>;
    let location: Location
    let authService: AuthService
    let dataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule,
                RouterTestingModule.withRoutes([
                    { path: 'my-time', component: MyTimeComponent }
                ]),
            ],
            declarations: [AddMyTimeComponent, MyTimeComponent],
            providers: [
                { provide: AuthService, useValue: { getId() { return 'iiid' } } },
                { provide: DataService, useValue: {} },
                SnackBarService
            ],
        });
        fixture = TestBed.createComponent(AddMyTimeComponent);
        comp = fixture.componentInstance;
        authService = fixture.debugElement.injector.get(AuthService);
        location = fixture.debugElement.injector.get(Location);
        dataService = fixture.debugElement.injector.get(DataService)
        fixture.detectChanges();
    });

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
                    dataService.addTimeZone = (id, payload) => Observable.of('ok')
                })
                describe('api call', () => {
                    let spy;
                    beforeEach(() => {
                        spy = spyOn(dataService, 'addTimeZone').and.callThrough()
                        fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                    })
                    it('should successfully post', () => {
                        expect(spy).toHaveBeenCalled();
                    })
                    it('should call with right arguments', () => {
                        expect(spy).toHaveBeenCalledWith('iiid', Object({ name: 'nnnn', city: 'cccc', gmtTimeDifference: 3 }));
                    })
                })
                xit('should navigate to "my-time" route', fakeAsync(() => {
                    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                    tick(100)
                    expect(location.path()).toBe('/my-time')
                }))
            })
            describe('Error Scenario', () => {
                beforeEach(() => {
                    dataService.addTimeZone = (id, payload) => Observable.throw('Error')
                    fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement.click()
                })
                it('should handle error', () => {
                    expect(comp).toBeTruthy();
                })
            })
        })
    })

})
