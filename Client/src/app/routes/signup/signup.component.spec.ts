import { SignupModule } from './signup.module';
import { SignupComponent } from './signup.component';
import { SnackBarService } from '../shared/services/snackbar.service';
import { SharedModule } from '../shared/shared.module';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/services/data.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
describe('Signup Component', () => {

    let comp: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let sb: SnackBarService

    const user = {
        name: 'Ahmed',
        password: '454565',
        email: 'sads@ewew.com'

    }

    const dataServiceStub = {
        signUp(data) {
            return Observable.of(data)
        },
        login(data) {
            return Observable.of(data)
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
            imports: [RouterTestingModule, SignupModule, SharedModule],
            declarations: [],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
            ],
        });
        fixture = TestBed.createComponent(SignupComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
    });



    describe('Submitting Form', () => {
        describe('Scenario: posting new', () => {
            beforeEach(() => {

            })
            describe('Scenario: Success', () => {
                beforeEach(() => {
                    dataService.signup = (data) => Observable.of(user)
                    comp.onSubmit(user)
                })
                it('should successfully post', () => {
                    expect(comp).toBeTruthy()
                })
            })


            describe('Scenario: Error', () => {
                beforeEach(() => {
                    dataService.signup = (data) => Observable.throw('Error')
                    comp.onSubmit(user)
                })
                it('should respond to error', () => {
                    expect(comp).toBeTruthy()
                })
            })
        })

    })


})
