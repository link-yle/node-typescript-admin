import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthInterceptor } from 'app/core/http-interceptors/authentication-interceptor';
import { TestRequest } from '@angular/common/http/testing/src/request';
import { AuthService } from 'app/core/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { DataService } from 'app/core/services/data.service';

let httpMock: HttpTestingController;
let httpClient: HttpClient;
let service: DataService;

describe('Auth interceptor', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, DataService, AuthService, SnackBarService, RouterTestingModule,]
        });
        const injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        httpClient = injector.get(HttpClient);
        service = injector.get(DataService);
    });

    describe('intercept HTTP requests', () => {
        let dummy;
        let req: TestRequest;
        beforeEach(() => {
            dummy = 'ok';
            service.changeMyPasswordUsingRecoveryCode({ recoveryCode: 'aaa', newPassword: 'qqq', email: 'aaa@e' }).subscribe()
            req = httpMock.expectOne(req => req.method === 'POST');
        })
        afterEach(() => {
            req.flush(dummy);
        })
        it('should have appropriate headers ', () => {
            expect(req.request.headers.get('Authorization')).toBe('Bearer null')
        });
    });
    afterEach(() => {
        httpMock.verify();
    });
});
