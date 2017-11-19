import { FormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { EditRoleComponent } from './edit-role.component';
import { DataService } from '../../shared/services/data.service';
import { CommonModule } from '@angular/common';
import { SelectedUserService } from '../../shared/services/selectedUser.service';

describe('Home Component', () => {
    let comp: EditRoleComponent;
    let fixture: ComponentFixture<EditRoleComponent>;
    let sb: SnackBarService



    const dataServiceStub = {
        assignRole(data) {
            return Observable.of('Ok')
        }
    }
    const SelectedDataServiceStub = {
        get() {
            return { _id: '123' }
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
            imports: [RouterTestingModule, CommonModule, FormsModule],
            declarations: [],
            providers: [
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
                { provide: SelectedUserService, useValue: SelectedDataServiceStub },
            ],
        });
        fixture = TestBed.createComponent(EditRoleComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        sb = fixture.debugElement.injector.get(SnackBarService);
    });



    describe('Assigning role', () => {
        describe('Scenario: Success', () => {
            beforeEach(() => {
                comp.ngOnInit()
                dataService.assignRole = (data) => Observable.of('Ok')
                comp.userRole = 'regular'
                comp.onAssignClick()
            })
            it('should successfully post', () => {
                expect(comp).toBeTruthy()
            })
        })


        describe('Scenario: Error', () => {
            beforeEach(() => {
                comp.ngOnInit()
                dataService.signup = (data) => Observable.throw('Error')
                comp.userRole = 'regular'
                comp.onAssignClick()
            })
            it('should respond to error', () => {
                expect(comp).toBeTruthy()
            })
        })
    })


})
