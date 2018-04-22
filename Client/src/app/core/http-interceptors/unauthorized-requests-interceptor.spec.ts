import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { UnAuthorizedRequestsInterceptor } from 'app/core/http-interceptors/unauthorized-requests-interceptor';
import { mock } from 'ts-mockito';
import { HttpRequest, HttpHandler } from '@angular/common/http';
import { SharedModule } from 'app/shared/shared.module';
import { Observable } from 'rxjs/Observable';
import { LoginComponent } from 'app/routes/personal/login/login.component';

let service: UnAuthorizedRequestsInterceptor;
let sb: SnackBarService;
fdescribe('UnAuthorizedRequestsInterceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([
                { path: 'login', component: LoginComponent },
            ]), SharedModule],
            declarations: [LoginComponent],
            providers: [UnAuthorizedRequestsInterceptor, SnackBarService]
        });
        const injector = getTestBed();
        service = injector.get(UnAuthorizedRequestsInterceptor);
        sb = injector.get(SnackBarService);
    });

    describe('intercept HTTP requests', () => {
        let req: HttpRequest<any>;
        let next: HttpHandler;
        beforeEach(() => {
            req = mock(HttpRequest)
            next = mock(HttpHandler)
        })
        describe('error is not an instance of HttpErrorResponse', () => {
            let spy: jasmine.Spy;
            beforeEach(() => {
                spy = spyOn(sb, 'emitErrorSnackBar')
            })
            describe('error is a string', () => {
                it('should not emit snackbar message  ', (done) => {
                    next.handle = (x) => Observable.throw('E')
                    service.intercept(req, next).subscribe(
                        data => { },
                        err => {
                            expect(spy).not.toHaveBeenCalled()
                            done()
                        }
                    )
                });
            })
            describe('error is a an object with message prop', () => {
                it('should not emit snackbar message  ', (done) => {
                    next.handle = (x) => Observable.throw({ message: 'aa' })
                    service.intercept(req, next).subscribe(
                        data => { },
                        err => {
                            expect(spy).not.toHaveBeenCalled()
                            done()
                        }
                    )
                });
            })
        })

        describe('error is an instance of HttpErrorResponse', () => {
            let spy: jasmine.Spy;
            beforeEach(() => {
                spy = spyOn(sb, 'emitErrorSnackBar')
            })
            describe('error has a status of 401', () => {
                describe('no message prop for error object', () => {
                    it('should emit snackbar message  ', (done) => {
                        const err = new HttpErrorResponse({ status: 401, error: 'aa' })
                        next.handle = (x) => Observable.throw(err)
                        service.intercept(req, next).subscribe(
                            data => {
                                expect(spy).toHaveBeenCalled()
                                done()
                            },
                        )
                    });
                })

                describe('message prop for error object', () => {
                    it('should emit snackbar message  ', (done) => {
                        const err = new HttpErrorResponse({ status: 401, error: { message: 'aa' } })
                        next.handle = (x) => Observable.throw(err)
                        service.intercept(req, next).subscribe(
                            data => {
                                expect(spy).toHaveBeenCalled()
                                done()
                            },
                        )
                    });
                })
            })
        })

    });

});
