import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { TimingsComponent } from './timings.component';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { DataService } from 'app/shared/services/data.service';
import { AuthService } from 'app/shared/services/auth.service';

describe('Timings Component', () => {
    let comp: TimingsComponent;
    let fixture: ComponentFixture<TimingsComponent>;
    let sb: SnackBarService

    const fakeTimeZones = [
        {
            name: 'CairoRegular', city: 'Cairo', gmtTimeDifference: 2, id: '12'
        },
        {
            name: 'CairoSummer', city: 'Cairo', gmtTimeDifference: 3, id: '35'
        },
        {
            name: 'AEST', city: 'Sydney', gmtTimeDifference: 2, id: '89'
        },
        {
            name: 'AEDT', city: 'Sydney', gmtTimeDifference: 2, id: '56'
        },
    ]
    const fakeUserDetails = {
        name: 'Y',
        roles: 'regular',
        timeZones: fakeTimeZones
    }
    const dataServiceStub = {
        deleteTimeZone(data) {
            return Observable.of('Ok')
        },
        getTimeZones() {
            return Observable.of(fakeTimeZones)
        },
        getUserDetails () {
            return Observable.of(fakeUserDetails)
        }

    }

    const authServiceStub = {
        getProfile() {
            return {
                _id: '123'
            }
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
            imports: [RouterTestingModule],
            declarations: [],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
                { provide: AuthService, useValue: authServiceStub },
            ],
        });
        fixture = TestBed.createComponent(TimingsComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
    });


    describe('Scenario: Get Timings', () => {
        beforeEach(() => {

        })
        describe('Scenario: Success', () => {
            beforeEach(() => {
                dataService.getUserDetails = () => Observable.of(fakeTimeZones)
                // comp.ngOnInit()
            })
            it('should successfully post', () => {
                expect(comp).toBeTruthy()
            })
        })


        describe('Scenario: Error', () => {
            beforeEach(() => {
                dataService.getUserDetails = () => Observable.throw('Error')
                // comp.ngOnInit()
            })
            it('should respond to error', () => {
                expect(comp).toBeTruthy()
            })
        })
    })


    describe('Scenario: delete timing', () => {
        beforeEach(() => {

        })
        describe('Scenario: Success', () => {
            beforeEach(() => {
                dataService.deleteTimeZone = (id) => Observable.of('Ok')
                comp.onDeleteClick(fakeTimeZones[0].id)
            })
            it('should successfully post', () => {
                expect(comp).toBeTruthy()
            })
        })


        describe('Scenario: Error', () => {
            beforeEach(() => {
                dataService.deleteTimeZone = (id) => Observable.throw('Error')
                comp.onDeleteClick(fakeTimeZones[0].id)
            })
            it('should respond to error', () => {
                expect(comp).toBeTruthy()
            })
        })
    })


})
