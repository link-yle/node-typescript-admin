import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { DataService } from 'app/core/services/data.service';
import { SharedModule } from 'app/shared/shared.module';
import { Location } from '@angular/common';
import { UsersComponent } from 'app/routes/users-list/users.component';
import { OtherUserTimeComponent } from 'app/routes/other-user-time/other-user-time.component';
import { EditOtherUserInfoComponent } from 'app/routes/edit-other-user-info/edit-other-user-info.component';
import { EditRoleComponent } from 'app/routes/edit-role/edit-role.component';
import { PaginationModule } from 'ngx-bootstrap/pagination/pagination.module';
import { AdminClaimsService } from 'app/core/services/admin-claims.service';
import { AuthService } from 'app/core/services/auth.service';
import { SelectedUserService } from 'app/core/services/selectedUser.service';
import { SnackBarService } from 'app/core/services/snackbar.service';

describe('Users Component', () => {
    let comp: UsersComponent;
    let fixture: ComponentFixture<UsersComponent>;
    let dataService: DataService
    let location: Location
    let authService: AuthService
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule, PaginationModule.forRoot(),
                RouterTestingModule.withRoutes([
                    { path: 'users/:id/time', component: OtherUserTimeComponent },
                    { path: 'users/:id/role', component: EditRoleComponent },
                    { path: 'users/:id', component: EditOtherUserInfoComponent },
                ]),
            ],
            declarations: [UsersComponent, OtherUserTimeComponent, EditOtherUserInfoComponent, EditRoleComponent],
            providers: [
                { provide: DataService, useValue: {} },
                Location,
                AdminClaimsService,
                { provide: AuthService, useValue: { getRole() { } } },
                SelectedUserService,
                SnackBarService
            ],
        })
        fixture = TestBed.createComponent(UsersComponent)
        comp = fixture.componentInstance
        dataService = fixture.debugElement.injector.get(DataService)
        location = fixture.debugElement.injector.get(Location)
        authService = fixture.debugElement.injector.get(AuthService)
    })

    describe('Users not retrieved successfully', () => {
        beforeEach(() => {
            dataService.getUsers = () => Observable.throw('E')
            fixture.detectChanges()
        })
        it('name should handle error', () => {
            expect(comp).toBeTruthy()
        })
    })
    describe('Users retrieved successfully', () => {
        beforeEach(() => {
            const users = [{ _id: '11', name: 'YYasd', email: 'asddl@kfdl.com', role: 'regular' }]
            const data = { users, count: 111 }
            dataService.getUsers = () => Observable.of(data)
        })
        it('getUsers api method should have been called with the right arguments', () => {
            const spy = spyOn(dataService, 'getUsers').and.callThrough()
            fixture.detectChanges()
            expect(spy).toHaveBeenCalledWith(Object({ searchTerm: undefined, skip: 0 }))
        })

        describe('table', () => {
            beforeEach(() => {
                fixture.detectChanges()
            })
            it('name should get displayed', () => {
                expect(fixture.nativeElement.querySelectorAll('td')[0].innerHTML).toBe('YYasd')
            })
            it('role should get displayed', () => {
                expect(fixture.nativeElement.querySelectorAll('td')[1].innerHTML).toBe('regular')
            })
            it('email should get displayed', () => {
                expect(fixture.nativeElement.querySelectorAll('td')[2].innerHTML).toBe('asddl@kfdl.com')
            })
        })

        describe('Navigation', () => {
            it('should navigate to "update-user-info" route', fakeAsync(() => {
                fixture.detectChanges()
                fixture.nativeElement.querySelectorAll('.fa-edit')[0].click()
                tick(100)
                expect(location.path()).toBe('/users/11')
            }))
            describe('is Admin', () => {
                beforeEach(() => {
                    authService.getRole = () => 'admin'
                    fixture.detectChanges()
                })
                it('should navigate to "update-user-time" route', fakeAsync(() => {
                    fixture.nativeElement.querySelectorAll('.fa-clock-o')[0].click()
                    tick(100)
                    expect(location.path()).toBe('/users/11/time')
                }))
                it('should navigate to "update-user-role" route', fakeAsync(() => {
                    fixture.nativeElement.querySelectorAll('.fa-user-o')[0].click()
                    tick(100)
                    expect(location.path()).toBe('/users/11/role')
                }))
            })
            describe('is not admin', () => {
                it('should not show icon that navigate to "update-user-time" route', () => {
                    expect(fixture.nativeElement.querySelectorAll('.fa-clock-o')[0]).toBeFalsy()
                })
                it('should not show icon that navigate to "update-user-role" route', () => {
                    expect(fixture.nativeElement.querySelectorAll('.fa-user-o')[0]).toBeFalsy()
                })
            })
        })

        describe('Delete user', () => {
            describe('Scenario: Success', () => {
                beforeEach(() => {
                    fixture.detectChanges()
                    dataService.deleteUser = (id) => Observable.of('ok')
                    dataService.getUsers = () => Observable.of({ users: [] })
                    fixture.nativeElement.querySelectorAll('.fa-trash')[0].click()
                    fixture.detectChanges()
                })
                it('user row should not be available', () => {
                    expect(fixture.nativeElement.querySelectorAll('td')[0]).toBeFalsy()
                })
            })

            describe('Scenario: Error', () => {
                beforeEach(() => {
                    fixture.detectChanges()
                    dataService.deleteUser = (id) => Observable.throw('E')
                    dataService.getUsers = () => Observable.of({ users: [] })
                    fixture.nativeElement.querySelectorAll('.fa-trash')[0].click()
                    fixture.detectChanges()
                })
                it('user row should be available', () => {
                    expect(fixture.nativeElement.querySelectorAll('td')[0]).toBeTruthy()
                })
            })
        })

        describe('Activate user', () => {
            describe('markup before activation', () => {
                it('user should appear unactivated', () => {
                    expect(fixture.nativeElement.querySelectorAll('.fa-check')[0]).toBeFalsy()
                })
            })
            describe('Activate user api', () => {
                describe('Scenario: Success', () => {
                    beforeEach(() => {
                        dataService.activateUserAdministratively = (id) => Observable.of('ok')
                        fixture.detectChanges()
                        fixture.nativeElement.querySelectorAll('.fa-edit')[1].click()
                        fixture.detectChanges()
                    })
                    it('user should appear activated', () => {
                        expect(fixture.nativeElement.querySelectorAll('.fa-check')[0]).toBeTruthy()
                    })
                })

                describe('Scenario: Error', () => {
                    beforeEach(() => {
                        dataService.activateUserAdministratively = (id) => Observable.throw('E')
                        fixture.detectChanges()
                        fixture.nativeElement.querySelectorAll('.fa-edit')[1].click()
                        fixture.detectChanges()
                    })
                    it('user should not appear activated', () => {
                        expect(fixture.nativeElement.querySelectorAll('.fa-check')[0]).toBeFalsy()
                    })
                })
            })
        })


        describe('Pagination', () => {
            beforeEach(() => {
                fixture.detectChanges()
            })
            it('The correct number of pages should appear in addition to previous and next page links', () => {
                expect(fixture.nativeElement.querySelectorAll('.page-item').length).toBe(14)
            })
            describe('Moving to the next page', () => {
                it('getUsers api method should have been called with the right arguments', () => {
                    const spy = spyOn(dataService, 'getUsers').and.callThrough()
                    fixture.nativeElement.querySelectorAll('.page-item a')[13].click()
                    expect(spy).toHaveBeenCalledWith(Object({ searchTerm: undefined, skip: 10 }))
                })
            })
        })


        describe('Search functionality', () => {
            beforeEach(() => {
                fixture.detectChanges()
                const searchFieldElement = fixture.nativeElement.querySelector('#search_field')
                searchFieldElement.value = 'ss'
                searchFieldElement.dispatchEvent(new Event('input'));
            })
            xit('getUsers api method should have been called with the right arguments', (done) => {
                const spy = spyOn(dataService, 'getUsers').and.callThrough()
                setTimeout(() => {
                    console.log(comp.currentPage)
                    expect(spy).toHaveBeenCalledWith(Object({ searchTerm: 'ss', skip: 0 }))
                    done()
                }, 500)

            })
        })


    })
})

