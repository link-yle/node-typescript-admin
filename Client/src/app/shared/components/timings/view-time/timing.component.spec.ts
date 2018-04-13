import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { TimingsComponent } from './timings.component';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';
import { AuthService } from 'app/core/services/auth.service';
import { TimingsService } from 'app/core/services/timings.service';
import { SharedModule } from 'app/shared/shared.module';

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
        getUserDetails() {
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, SharedModule],
            declarations: [],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                SnackBarService,
                AuthService,
                TimingsService
            ],
        });
        fixture = TestBed.createComponent(TimingsComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
    });




    describe('get time', () => {
        it('should get time appropriately undependant from local time', () => {
            expect(comp.getTime(2)).toContain(':');
        })

    })


})
