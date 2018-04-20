import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { SnackBarService } from 'app/core/services/snackbar.service';
import { Router } from '@angular/router';

@Injectable()
export class UnAuthorizedRequestsInterceptor implements HttpInterceptor {

    constructor(
        private router: Router,
        private sb: SnackBarService
    ) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(err => {
            if (!(err instanceof HttpErrorResponse)) {
                const message = err.message ? err.message : err.toString();
                this.sb.emitErrorSnackBar(message)
                return Observable.throw(message)
            } else if (err.status === 401 || err.status === 403) {
                this.sb.emitErrorSnackBar(err.message)
                this.router.navigate(['login'])
                return Observable.of(null);
            } else {
                console.error(err);
                return Observable.throw(err.message);
            }
        });
    }
}
