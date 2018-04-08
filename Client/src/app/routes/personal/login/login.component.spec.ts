import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from 'app/shared/services/snackbar.service';
import { LoginComponent } from 'app/routes/personal/login/login.component';
import { DataService } from 'app/shared/services/data.service';

describe('Home Component', () => {
    let comp: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let sb: SnackBarService

    const user = {
        name: 'Ahmed'
    }

    const dataServiceStub = {
        login(data) {
            return Observable.of(user)
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
            ],
        });
        fixture = TestBed.createComponent(LoginComponent);
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
